import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { RoomTaskListGQL, TaskCreateGQL } from 'src/app/graphql';

@Component({
  selector: 'app-room-detail-tasks-creation-bar',
  templateUrl: './room-detail-tasks-creation-bar.component.html',
  styleUrls: ['./room-detail-tasks-creation-bar.component.scss'],
})
export class RoomDetailTasksCreationBarComponent implements OnInit {
  data = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private listGql: RoomTaskListGQL,
    private createGql: TaskCreateGQL,
  ) {}

  ngOnInit() {}

  create() {
    if (this.loading) return;
    const roomId = this.route.parent!.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.createGql
      .mutate(
        { data: { room: roomId, title: this.data } },
        {
          update: (_, result) => {
            const query = this.listGql.watch({ id: roomId });
            query.updateQuery((prev) => ({
              ...prev,
              room: {
                ...prev.room,
                tasks: {
                  ...prev.room.tasks,
                  total: prev.room.tasks.total + 1,
                  results: [
                    result.data!.createTask,
                    ...prev.room.tasks.results,
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
