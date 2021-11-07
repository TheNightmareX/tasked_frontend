import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { TaskCreateGQL } from 'src/app/graphql';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css'],
})
export class TaskCreationComponent implements OnInit {
  data = {
    title: '',
    description: '',
  };
  loading = false;

  constructor(
    private notifier: NotifierService,
    private createGql: TaskCreateGQL,
    private popup: PopupComponent,
  ) {}

  ngOnInit() {}

  create() {
    this.loading = true;
    this.createGql
      .mutate({ data: this.data })
      .pipe(
        leastTime(1000),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        () => {
          this.notifier.notify(NotificationType.Success, 'Task created');
          this.popup.close();
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
