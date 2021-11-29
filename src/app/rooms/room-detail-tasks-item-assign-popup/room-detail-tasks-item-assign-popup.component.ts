import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  AssignmentCreateGQL,
  AssignmentDeleteGQL,
  RoomMembershipListGQL,
  RoomMembershipListQuery,
  RoomTaskListQuery,
  Role,
  TaskAssignmentListGQL,
  TaskAssignmentListQuery,
} from 'src/app/graphql';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-room-detail-tasks-item-assign-popup',
  templateUrl: './room-detail-tasks-item-assign-popup.component.html',
  styleUrls: ['./room-detail-tasks-item-assign-popup.component.scss'],
})
export class RoomDetailTasksItemAssignPopupComponent
  implements OnInit, OnDestroy
{
  @Input() task?: Task;
  items: Item[] = [];
  loading = false;

  private taskId!: string;
  private subscription?: Subscription;

  constructor(
    public popup: PopupComponent,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private membershipListGqL: RoomMembershipListGQL,
    private assignmentListGql: TaskAssignmentListGQL,
    private assignmentCreateGql: AssignmentCreateGQL,
    private assignmentDeleteGql: AssignmentDeleteGQL,
  ) {}

  ngOnInit() {
    this.taskId = this.route.parent!.snapshot.paramMap.get('id')!;
    if (this.task)
      this.subscription = combineLatest([
        this.membershipListGqL
          .watch({ id: this.taskId })
          .valueChanges.pipe(
            map((result) => result.data.room.memberships.results),
          ),
        this.assignmentListGql
          .watch({ id: this.task.id })
          .valueChanges.pipe(
            map((result) => result.data.task.assignments.results),
          ),
      ]).subscribe(([memberships, assignments]) => {
        const items: Record<string, Item> = {};

        memberships
          .filter((item) => item.role == Role.Member)
          .forEach((membership) => {
            items[membership.id] = {
              membership,
              selected: false,
            };
          });

        assignments.forEach((assignment) => {
          items[assignment.recipient.id].selected = true;
          items[assignment.recipient.id].assignment = assignment;
        });

        this.items = Object.values(items);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  update() {
    if (!this.task) return;
    if (this.loading) return;
    this.loading = true;

    const operations = this.items
      .filter((item) => {
        const isChanged = item.selected != !!item.assignment;
        return isChanged;
      })
      .map((item) => {
        if (item.assignment)
          return this.deleteAssignment(item.assignment).pipe(
            map(() => 'deletion' as const),
          );
        else
          return this.createAssignment(item.membership).pipe(
            map(() => 'creation' as const),
          );
      });

    if (operations)
      forkJoin(operations)
        .pipe(
          leastTime(1000),
          finalize(() => {
            this.loading = false;
            // Close the popup whether succeed or not because I'm lazy to
            // restore the selections if it fails. :]
            this.popup.close();
          }),
        )
        .subscribe(
          (results) => {
            const { creation, deletion } = results.reduce(
              (counter, operation) => {
                if (operation == 'creation') counter.creation++;
                else counter.deletion++;
                return counter;
              },
              { creation: 0, deletion: 0 },
            );
            this.notifier.notify(
              NotificationType.Success,
              $localize`Assigned: ${creation}; Revoked: ${deletion}`,
            );
          },
          () => {
            this.notifier.notify(
              NotificationType.Error,
              $localize`Failed to update the assignments`,
            );
          },
        );
  }

  identifyItem(index: number, item: Item) {
    return item.membership.id;
  }

  private createAssignment(recipient: Membership) {
    return this.assignmentCreateGql.mutate(
      {
        data: { task: this.task!.id, recipient: recipient.id },
      },
      {
        update: (_, result) => {
          const query = this.assignmentListGql.watch({ id: this.task!.id });
          query.updateQuery((prev) => ({
            ...prev,
            task: {
              ...prev.task,
              assignments: {
                ...prev.task.assignments,
                total: prev.task.assignments.total + 1,
                results: [
                  result.data!.createAssignment,
                  ...prev.task.assignments.results,
                ],
              },
            },
          }));
        },
      },
    );
  }

  private deleteAssignment(assignment: Assignment) {
    return this.assignmentDeleteGql.mutate(
      { id: assignment.id },
      {
        update: (cache, result) => {
          cache.evict({ id: cache.identify(result.data!.deleteAssignment) });
          const query = this.assignmentListGql.watch({ id: this.task!.id });
          query.updateQuery((prev) => ({
            ...prev,
            task: {
              ...prev.task,
              assignments: {
                ...prev.task.assignments,
                total: prev.task.assignments.total - 1,
              },
            },
          }));
        },
      },
    );
  }
}

type Task = RoomTaskListQuery['room']['tasks']['results'][number];

type Membership =
  RoomMembershipListQuery['room']['memberships']['results'][number];

type Assignment =
  TaskAssignmentListQuery['task']['assignments']['results'][number];

interface Item {
  membership: Membership;
  selected: boolean;
  assignment?: Assignment;
}
