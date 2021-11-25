import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  ClassroomTaskListGQL,
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

  loading = false;
  expanded = false;

  constructor(
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private formData: FormDataService,
    private listGql: ClassroomTaskListGQL,
    private updateGql: TaskUpdateGQL,
    private deleteGql: TaskDeleteGQL,
  ) {}

  ngOnInit() {}

  initData() {
    if (this.task)
      this.data = this.formData.pick(this.task, ['title', 'description']);
  }

  update() {
    if (!this.task) return;
    const data = { ...this.data };
    this.formData.filterUnchanged(data, this.task);
    this.mutate(
      this.updateGql.mutate({ id: this.task.id, data }),
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
            const id = this.route.parent!.snapshot.paramMap.get('id')!;
            this.listGql.watch({ id }).updateQuery((prev) => ({
              ...prev,
              classroom: {
                ...prev.classroom,
                tasks: {
                  ...prev.classroom.tasks,
                  total: prev.classroom.tasks.total - 1,
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
}
