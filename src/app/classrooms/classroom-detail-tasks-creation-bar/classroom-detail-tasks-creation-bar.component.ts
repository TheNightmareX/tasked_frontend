import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ApolloHelperService } from 'src/app/core/apollo-helper.service';
import {
  ClassroomTaskListGQL,
  ClassroomTaskListQuery,
  ClassroomTaskListQueryVariables,
  TaskCreateGQL,
} from 'src/app/graphql';

@Component({
  selector: 'app-classroom-detail-tasks-creation-bar',
  templateUrl: './classroom-detail-tasks-creation-bar.component.html',
  styleUrls: ['./classroom-detail-tasks-creation-bar.component.css'],
})
export class ClassroomDetailTasksCreationBarComponent implements OnInit {
  data = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private createGql: TaskCreateGQL,
    private classroomTaskListGql: ClassroomTaskListGQL,
    private apolloHelper: ApolloHelperService,
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
            this.apolloHelper.updateQueryCache<
              ClassroomTaskListQuery,
              ClassroomTaskListQueryVariables
            >({
              query: this.classroomTaskListGql.document,
              data: (prev) => ({
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
              }),
              variables: { id: classroomId },
            });
          },
        },
      )
      .pipe(
        leastTime(1000),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        () => {
          this.notifier.notify(NotificationType.Success, 'Task created');
          this.data = '';
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            'Failed to create the task',
          );
        },
      );
  }
}
