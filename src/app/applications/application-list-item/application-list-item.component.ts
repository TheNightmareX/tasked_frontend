import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  ApplicationStatus,
  RoomMembershipListGQL,
  JoinApplicationAcceptGQL,
  JoinApplicationListQuery,
  JoinApplicationRejectGQL,
} from 'src/app/graphql';

type Application =
  JoinApplicationListQuery['joinApplications']['results'][number];

@Component({
  selector: 'app-application-list-item',
  templateUrl: './application-list-item.component.html',
  styleUrls: ['./application-list-item.component.scss'],
})
export class ApplicationListItemComponent implements OnInit {
  @Input() application?: Application;
  @Input() actions = false;
  loading = false;
  ApplicationStatus = ApplicationStatus;
  applicationStatusText = {
    [ApplicationStatus.Accepted]: $localize`Accepted`,
    [ApplicationStatus.Pending]: $localize`Pending`,
    [ApplicationStatus.Rejected]: $localize`Rejected`,
  };

  constructor(
    private notifier: NotifierService,
    private acceptGql: JoinApplicationAcceptGQL,
    private rejectGql: JoinApplicationRejectGQL,
    private roomMembershipListGql: RoomMembershipListGQL,
  ) {}

  ngOnInit() {}

  accept() {
    if (!this.application) return;
    const application = this.application;

    this.mutate(
      this.acceptGql.mutate(
        { id: application.id },
        {
          update: (_, result) => {
            const query = this.roomMembershipListGql.watch({
              id: application.room.id,
            });
            if (query.getCurrentResult().loading) return;
            query.updateQuery((prev) => ({
              ...prev,
              room: {
                ...prev.room,
                memberships: {
                  ...prev.room.memberships,
                  total: prev.room.memberships.total + 1,
                  results: [
                    ...prev.room.memberships.results,
                    result.data!.acceptJoinApplication.membership,
                  ],
                },
              },
            }));
          },
        },
      ),
      $localize`Application accepted`,
      $localize`Failed to accept the application`,
    );
  }

  reject() {
    if (!this.application) return;
    this.mutate(
      this.rejectGql.mutate({ id: this.application.id }),
      $localize`Application rejected`,
      $localize`Failed to reject the application`,
    );
  }

  private mutate<T>(
    mutation: Observable<T>,
    messageOnSuccess: string,
    messageOnFailure: string,
  ) {
    if (this.loading) return;
    mutation.pipe(finalize(() => (this.loading = false))).subscribe(
      () => this.notifier.notify(NotificationType.Success, messageOnSuccess),
      () => this.notifier.notify(NotificationType.Error, messageOnFailure),
    );
  }
}
