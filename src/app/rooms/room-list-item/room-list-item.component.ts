import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ApplicationCreateGQL, RoomListQuery } from 'src/app/graphql';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss'],
})
export class RoomListItemComponent implements OnInit {
  @Input() room?: Room;
  message = '';
  loading = false;

  @ViewChild(PopupComponent) private popup!: PopupComponent;

  constructor(
    private notifier: NotifierService,
    private applicationCreateGql: ApplicationCreateGQL,
  ) {}

  ngOnInit() {}

  apply() {
    if (!this.room) return;
    this.loading = true;
    this.applicationCreateGql
      .mutate({
        data: { room: this.room.id, message: this.message },
      })
      .pipe(
        leastTime(1000),
        finalize(() => (this.loading = false)),
      )
      .subscribe(
        () => {
          this.notifier.notify(NotificationType.Success, 'Application sent');
          this.popup.close();
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            'Failed to send the application',
          );
        },
      );
  }
}

type Room = RoomListQuery['rooms']['results'][number];
