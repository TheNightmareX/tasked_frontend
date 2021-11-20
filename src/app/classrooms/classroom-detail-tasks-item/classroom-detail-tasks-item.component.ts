import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  ClassroomTaskListQuery,
  TaskDeleteGQL,
  TaskUpdateGQL,
  TaskUpdateInput,
} from 'src/app/graphql';

type Task = ClassroomTaskListQuery['classroom']['tasks']['results'][number];

@Component({
  selector: 'app-classroom-detail-tasks-item',
  templateUrl: './classroom-detail-tasks-item.component.html',
  styleUrls: ['./classroom-detail-tasks-item.component.css'],
})
export class ClassroomDetailTasksItemComponent implements OnInit {
  @Input() task?: Task;
  data: TaskUpdateInput = {};

  /**
   * The inputs are conditional, so it's impossible to get the validation
   * status in the template. And because only the `title` field may fail
   * the validation, so only the `title`'s control will update this value.
   */
  valid = true;

  loading = false;

  /**
   * Accessors are needed here because the data should be initialized after
   * the expansion panel is expanded or closed.
   */
  get expanded() {
    return this._expanded;
  }
  set expanded(value: boolean) {
    this._expanded = value;
    if (value) this.initData();
  }
  private _expanded = false;

  constructor(
    private notifier: NotifierService,
    private formData: FormDataService,
    private updateGql: TaskUpdateGQL,
    private deleteGql: TaskDeleteGQL,
  ) {}

  ngOnInit() {}

  private initData() {
    if (this.task)
      this.data = this.formData.pick(this.task, ['title', 'description']);
  }

  update() {
    if (!this.task) return;
    const data = { ...this.data };
    this.formData.filterUnchanged(data, this.task);
    this.mutate(
      this.updateGql.mutate({ id: this.task.id, data }),
      'Task updated',
      'Failed to update the task',
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
          },
        },
      ),
      'Task deleted',
      'Failed to delete the task',
    );
  }

  private mutate(
    mutation: Observable<unknown>,
    messageOnSucceed: string,
    messageOnFail: string,
  ) {
    if (this.loading) return;
    this.loading = true;
    mutation
      .pipe(
        leastTime(1000),
        finalize(() => (this.loading = false)),
      )
      .subscribe(
        () => this.notifier.notify(NotificationType.Success, messageOnSucceed),
        () => this.notifier.notify(NotificationType.Error, messageOnFail),
      );
  }
}
