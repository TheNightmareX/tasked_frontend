import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable, Subscription } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { filterKeys } from 'src/app/common/filter-keys.func';
import { isEmpty } from 'src/app/common/is-empty.func';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { pick } from 'src/app/common/pick.func';
import {
  MembershipTaskListGQL,
  MembershipTaskListQuery,
  RoomDetailGQL,
  TaskDeleteGQL,
  TaskUpdateGQL,
  TaskUpdateInput,
} from 'src/app/graphql';

type Task = MembershipTaskListQuery['membership']['tasks']['results'][number];

@Component({
  selector: 'app-room-detail-tasks-item',
  templateUrl: './room-detail-tasks-item.component.html',
  styleUrls: ['./room-detail-tasks-item.component.scss'],
})
export class RoomDetailTasksItemComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  data: TaskUpdateInput = {};
  loading = false;
  expanded = false;
  modification: TaskUpdateInput = {};
  modified = false;

  @ViewChild(NgForm) private form!: NgForm;
  private subscription = new Subscription();

  @Input()
  get task() {
    return this._task;
  }
  set task(v: Task | undefined) {
    this._task = v;
    this.updateModification();
  }
  private _task?: Task;

  constructor(
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private listGql: MembershipTaskListGQL,
    private updateGql: TaskUpdateGQL,
    private deleteGql: TaskDeleteGQL,
    private roomDetailGql: RoomDetailGQL,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.subscription.add(
      this.form
        .valueChanges!.pipe(delay(0))
        .subscribe(() => this.updateModification()),
    );
  }

  initData() {
    if (this.task) this.data = pick(this.task, ['title', 'description']);
  }

  update() {
    const task = this.task;
    if (!task) return;
    const data = filterKeys(this.data, (v, k) => v != task[k as keyof Task]);
    this.mutate(
      this.updateGql.mutate({ id: task.id, data }),
      $localize`Task updated`,
      $localize`Failed to update the task`,
    );
  }

  delete() {
    if (!this.task) return;
    this.mutate(
      this.deleteGql.mutate(
        { id: this.task.id },
        {
          update: (cache, result) => {
            cache.evict({ id: cache.identify(result.data!.deleteTask) });

            const roomId = this.route.parent!.snapshot.paramMap.get('id')!;
            const membershipId = this.roomDetailGql
              .watch({ id: roomId })
              .getCurrentResult().data.room.membership!.id;

            this.listGql.watch({ id: membershipId }).updateQuery((prev) => ({
              ...prev,
              membership: {
                ...prev.membership,
                tasks: {
                  ...prev.membership.tasks,
                  total: prev.membership.tasks.total - 1,
                },
              },
            }));
          },
        },
      ),
      $localize`Task deleted`,
      $localize`Failed to delete the task`,
    );
  }

  private mutate(
    mutation: Observable<unknown>,
    messageOnSucceed: string,
    messageOnFail: string,
  ) {
    if (this.loading) return;
    this.loading = true;
    mutation.pipe(finalize(() => (this.loading = false))).subscribe(
      () => this.notifier.notify(NotificationType.Success, messageOnSucceed),
      () => this.notifier.notify(NotificationType.Error, messageOnFail),
    );
  }

  private updateModification() {
    const task = this.task;
    if (!task) return;
    this.modification = filterKeys(
      this.data,
      (v, k) => v != task[k as keyof Task],
    );
    this.modified = isEmpty(this.modification);
  }
}
