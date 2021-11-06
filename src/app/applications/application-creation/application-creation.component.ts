import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import {
  JoinApplicationCreateGQL,
  JoinApplicationListGQL,
  JoinApplicationListQuery,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';

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
          update: (cache, result) => {
            const prev = cache.readQuery<JoinApplicationListQuery>({
              query: this.listGql.document,
            })!;
            cache.writeQuery<JoinApplicationListQuery>({
              query: this.listGql.document,
              data: {
                ...prev,
                joinApplications: {
                  ...prev.joinApplications,
                  results: [
                    result.data!.createJoinApplication,
                    ...prev.joinApplications.results,
                  ],
                },
              },
            });
          },
        },
      )
      .pipe(
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
