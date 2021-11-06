import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ApolloHelperService } from 'src/app/core/apollo-helper.service';
import {
  JoinApplicationCreateGQL,
  JoinApplicationListGQL,
  JoinApplicationListQuery,
} from 'src/app/graphql';

@Component({
  selector: 'app-application-creation',
  templateUrl: './application-creation.component.html',
  styleUrls: ['./application-creation.component.css'],
})
export class ApplicationCreationComponent implements OnInit {
  data = {
    classroom: null as number | null,
    message: '',
  };

  loading = false;

  constructor(
    private notifier: NotifierService,
    private createGql: JoinApplicationCreateGQL,
    private listGql: JoinApplicationListGQL,
    private apolloHelper: ApolloHelperService,
  ) {}

  ngOnInit() {}

  send() {
    if (this.loading) return;

    this.loading = true;
    const data = { ...this.data, classroom: this.data.classroom + '' };
    this.createGql
      .mutate(
        { data },
        {
          update: (_, result) => {
            this.apolloHelper.updateQueryCache<JoinApplicationListQuery>({
              query: this.listGql.document,
              data: (prev) => ({
                ...prev,
                joinApplications: {
                  ...prev.joinApplications,
                  results: [
                    result.data!.createJoinApplication,
                    ...prev.joinApplications.results,
                  ],
                },
              }),
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
          this.notifier.notify(
            NotificationType.Success,
            `Application sent to classroom #${data.classroom}`,
          );
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
