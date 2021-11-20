import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ApolloHelperService } from 'src/app/core/apollo-helper.service';
import {
  ApplicationStatus,
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  ClassroomMembershipListQueryVariables,
  JoinApplicationAcceptGQL,
  JoinApplicationListQuery,
  JoinApplicationRejectGQL,
} from 'src/app/graphql';

type Application =
  JoinApplicationListQuery['joinApplications']['results'][number];

@Component({
  selector: 'app-application-list-item',
  templateUrl: './application-list-item.component.html',
  styleUrls: ['./application-list-item.component.css'],
})
export class ApplicationListItemComponent implements OnInit {
  @Input() application?: Application;
  @Input() actions = false;
  loading = false;
  ApplicationStatus = ApplicationStatus;

  constructor(
    private notifier: NotifierService,
    private acceptGql: JoinApplicationAcceptGQL,
    private rejectGql: JoinApplicationRejectGQL,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
    private apolloHelper: ApolloHelperService,
  ) {}

  ngOnInit() {}

  accept() {
    if (!this.application) return;
    this.mutate(
      this.acceptGql.mutate(
        { id: this.application.id },
        {
          update: (_, result) => {
            this.apolloHelper.updateQueryCache<
              ClassroomMembershipListQuery,
              ClassroomMembershipListQueryVariables
            >({
              query: this.classroomMembershipListGql.document,
              variables: { id: this.application!.classroom.id },
              data: (prev) => ({
                ...prev,
                classroom: {
                  ...prev.classroom,
                  memberships: {
                    ...prev.classroom.memberships,
                    total: prev.classroom.memberships.total + 1,
                    results: [
                      ...prev.classroom.memberships.results,
                      result.data!.acceptJoinApplication.membership,
                    ],
                  },
                },
              }),
            });
          },
        },
      ),
      'Application accepted',
      'Failed to accept the application',
    );
  }

  reject() {
    if (!this.application) return;
    this.mutate(
      this.rejectGql.mutate({ id: this.application.id }),
      'Application rejected',
      'Failed to reject the application',
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
