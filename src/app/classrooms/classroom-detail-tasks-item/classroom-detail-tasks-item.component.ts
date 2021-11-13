import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  ClassroomTaskListQuery,
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
  ) {}

  ngOnInit() {}

  private initData() {
    if (this.task)
      this.data = this.formData.pick(this.task, ['title', 'description']);
  }

  update() {
    if (!this.task) return;
    if (this.loading) return;

    const data = { ...this.data };
    this.formData.filterUnchanged(data, this.task);

    this.loading = true;
    this.updateGql
      .mutate({ id: this.task.id, data })
      .pipe(
        leastTime(1000),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        () => {
          this.notifier.notify(NotificationType.Success, 'Task updated');
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            'Failed to update the task',
          );
        },
      );
  }
}
