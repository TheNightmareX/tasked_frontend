import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  JoinApplicationCreateGQL,
  JoinApplicationListGQL,
} from 'src/app/graphql';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

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
    private popup: PopupComponent,
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
            const query = this.listGql.watch();
            query.updateQuery((prev) => ({
              ...prev,
              joinApplications: {
                ...prev.joinApplications,
                total: prev.joinApplications.total + 1,
                results: [
                  result.data!.createJoinApplication,
                  ...prev.joinApplications.results,
                ],
              },
            }));
          },
        },
      )
      .pipe(
        leastTime(1000),
        finalize(() => {
          this.loading = false;
          this.popup.close();
        }),
      )
      .subscribe(
        () => {
          this.notifier.notify(
            NotificationType.Success,
            $localize`Application sent to classroom #${data.classroom}`,
          );
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to send the application`,
          );
        },
      );
  }
}
