import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  ApplicationStatus,
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  JoinApplicationAcceptGQL,
  JoinApplicationListQuery,
  JoinApplicationRejectGQL,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';

type Application =
  JoinApplicationListQuery['joinApplications']['results'][number];

@Component({
  selector: 'app-application-list-item',
  templateUrl: './application-list-item.component.html',
  styleUrls: ['./application-list-item.component.css'],
})
export class ApplicationListItemComponent implements OnInit {
  @Input()
  application?: Application;

  @Input()
  actions = false;

  loading = false;

  ApplicationStatus = ApplicationStatus;

  constructor(
    private notifier: NotifierService,
    private acceptGql: JoinApplicationAcceptGQL,
    private rejectGql: JoinApplicationRejectGQL,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
  ) {}

  ngOnInit() {}

  accept() {
    this.mutate(
      this.acceptGql.mutate(
        { id: this.application!.id },
        {
          update: (cache, result) => {
            const prev = cache.readQuery<ClassroomMembershipListQuery>({
              query: this.classroomMembershipListGql.document,
            });
            if (prev)
              cache.writeQuery<ClassroomMembershipListQuery>({
                query: this.classroomMembershipListGql.document,
                data: {
                  ...prev,
                  classroom: {
                    ...prev.classroom,
                    memberships: {
                      ...prev.classroom.memberships,
                      results: [
                        ...prev.classroom.memberships.results,
                        result.data!.acceptJoinApplication.membership,
                      ],
                    },
                  },
                },
              });
          },
        },
      ),
      'Application accepted',
      'Failed to accept the application',
    );
  }

  reject() {
    this.mutate(
      this.rejectGql.mutate({ id: this.application!.id }),
      'Application rejected',
      'Failed to reject the application',
    );
  }

  private mutate<T>(
    mutation: Observable<T>,
    messageOnSuccess: string,
    messageOnFailure: string,
    onSucceed?: () => void,
  ) {
    if (!this.application) return;
    if (this.loading) return;
    mutation
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        () => {
          this.notifier.notify(NotificationType.Success, messageOnSuccess);
          onSucceed?.();
        },
        () => {
          this.notifier.notify(NotificationType.Error, messageOnFailure);
        },
      );
  }
}
