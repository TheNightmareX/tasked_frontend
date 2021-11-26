import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ClassroomTaskListGQL, TaskCreateGQL } from 'src/app/graphql';

@Component({
  selector: 'app-classroom-detail-tasks-creation-bar',
  templateUrl: './classroom-detail-tasks-creation-bar.component.html',
  styleUrls: ['./classroom-detail-tasks-creation-bar.component.scss'],
})
export class ClassroomDetailTasksCreationBarComponent implements OnInit {
  data = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private listGql: ClassroomTaskListGQL,
    private createGql: TaskCreateGQL,
  ) {}

  ngOnInit() {}

  create() {
    if (this.loading) return;
    const classroomId = this.route.parent!.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.createGql
      .mutate(
        { data: { classroom: classroomId, title: this.data } },
        {
          update: (_, result) => {
            const query = this.listGql.watch({ id: classroomId });
            query.updateQuery((prev) => ({
              ...prev,
              classroom: {
                ...prev.classroom,
                tasks: {
                  ...prev.classroom.tasks,
                  total: prev.classroom.tasks.total + 1,
                  results: [
                    result.data!.createTask,
                    ...prev.classroom.tasks.results,
                  ],
                },
              },
            }));
          },
        },
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.notifier.notify(
            NotificationType.Success,
            $localize`Task created`,
          );
          this.data = '';
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to create the task`,
          );
        },
      );
  }
}
