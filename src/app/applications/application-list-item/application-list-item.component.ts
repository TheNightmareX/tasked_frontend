import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  ApplicationStatus,
  ClassroomMembershipListGQL,
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

  loading = false;
  isOwn$!: Observable<boolean>;

  ApplicationStatus = ApplicationStatus;

  constructor(
    private auth: AuthService,
    private notifier: NotifierService,
    private acceptGql: JoinApplicationAcceptGQL,
    private rejectGql: JoinApplicationRejectGQL,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
  ) {}

  ngOnInit() {
    this.isOwn$ = this.auth.user$.pipe(
      map((user) => this.application?.owner.id == user!.id),
    );
  }

  accept() {
    this.mutate(
      this.acceptGql.mutate({ id: this.application!.id }),
      'Application accepted',
      'Failed to accept the application',
      () => {
        this.classroomMembershipListGql
          .watch({
            id: this.application!.classroom.id,
          })
          .refetch();
      },
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
