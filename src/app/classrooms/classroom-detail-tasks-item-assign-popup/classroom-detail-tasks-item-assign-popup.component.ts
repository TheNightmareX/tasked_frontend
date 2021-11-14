import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ApolloHelperService } from 'src/app/core/apollo-helper.service';
import {
  AssignmentCreateGQL,
  AssignmentDeleteGQL,
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  ClassroomTaskListQuery,
  Role,
  TaskAssignmentListGQL,
  TaskAssignmentListQuery,
  TaskAssignmentListQueryVariables,
} from 'src/app/graphql';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-classroom-detail-tasks-item-assign-popup',
  templateUrl: './classroom-detail-tasks-item-assign-popup.component.html',
  styleUrls: ['./classroom-detail-tasks-item-assign-popup.component.css'],
})
export class ClassroomDetailTasksItemAssignPopupComponent
  implements OnInit, OnDestroy
{
  @Input() task?: Task;
  items: Item[] = [];
  loading = false;

  private subscription?: Subscription;

  constructor(
    public popup: PopupComponent,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private membershipListGqL: ClassroomMembershipListGQL,
    private assignmentListGql: TaskAssignmentListGQL,
    private assignmentCreateGql: AssignmentCreateGQL,
    private assignmentDeleteGql: AssignmentDeleteGQL,
    private apolloHelper: ApolloHelperService,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    if (this.task)
      this.subscription = combineLatest([
        this.membershipListGqL
          .watch({ id })
          .valueChanges.pipe(
            map((result) =>
              result.data.classroom.memberships.results.filter(
                (item) => item.role == Role.Student,
              ),
            ),
          ),
        this.assignmentListGql
          .watch({ id: this.task.id })
          .valueChanges.pipe(
            map((result) => result.data.task.assignments.results),
          ),
      ]).subscribe(([memberships, assignments]) => {
        const items: Record<string, Item> = {};

        memberships.forEach((membership) => {
          items[membership.owner.id] = {
            user: membership.owner,
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
          return this.createAssignment(item.user).pipe(
            map(() => 'creation' as const),
          );
      });

    if (operations)
      forkJoin(operations)
        .pipe(
          leastTime(1000),
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe((results) => {
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
            `Assignments updated: assigned ${creation}, revoked ${deletion}`,
          );
          this.popup.close();
        });
  }

  identifyItem(index: number, item: Item) {
    return item.user.id;
  }

  private createAssignment(recipient: User) {
    return this.assignmentCreateGql.mutate(
      {
        data: { task: this.task!.id, recipient: recipient.id },
      },
      {
        update: (_, result) => {
          this.apolloHelper.updateQueryCache<
            TaskAssignmentListQuery,
            TaskAssignmentListQueryVariables
          >({
            query: this.assignmentListGql.document,
            data: (prev) => ({
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
            }),
            variables: { id: this.task!.id },
          });
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
        },
      },
    );
  }
}

type Task = ClassroomTaskListQuery['classroom']['tasks']['results'][number];

type User =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number]['owner'];

type Assignment =
  TaskAssignmentListQuery['task']['assignments']['results'][number];

interface Item {
  user: User;
  selected: boolean;
  assignment?: Assignment;
}
