import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  ApplicationStatus,
  RoomMembershipListGQL,
  ApplicationAcceptGQL,
  ApplicationListQuery,
  ApplicationRejectGQL,
  ApplicationDeleteGQL,
  ApplicationListGQL,
} from 'src/app/graphql';

type Application = ApplicationListQuery['applications']['results'][number];

@Component({
  selector: 'app-application-list-item',
  templateUrl: './application-list-item.component.html',
  styleUrls: ['./application-list-item.component.scss'],
})
export class ApplicationListItemComponent implements OnInit {
  @Input() application?: Application;
  @Input() own = false;
  loading = false;
  ApplicationStatus = ApplicationStatus;
  applicationStatusText = {
    [ApplicationStatus.Accepted]: $localize`Accepted`,
    [ApplicationStatus.Pending]: $localize`Pending`,
    [ApplicationStatus.Rejected]: $localize`Rejected`,
  };

  constructor(
    private notifier: NotifierService,
    private listGql: ApplicationListGQL,
    private acceptGql: ApplicationAcceptGQL,
    private rejectGql: ApplicationRejectGQL,
    private deleteGql: ApplicationDeleteGQL,
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
                    result.data!.acceptApplication.membership,
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

  delete() {
    if (!this.application) return;
    this.mutate(
      this.deleteGql.mutate(
        { id: this.application.id },
        {
          update: (cache, result) => {
            cache.evict({ id: cache.identify(result.data!.deleteApplication) });
            const query = this.listGql.watch();
            query.updateQuery((prev) => ({
              ...prev,
              applications: {
                ...prev.applications,
                total: prev.applications.total - 1,
              },
            }));
          },
        },
      ),
      $localize`Application deleted`,
      $localize`Failed to delete the application`,
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
