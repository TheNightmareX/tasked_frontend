import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { debounceTime, finalize, map, tap } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  JoinApplicationCreateGQL,
  JoinApplicationListGQL,
} from 'src/app/graphql';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

@Component({
  selector: 'app-application-creation',
  templateUrl: './application-creation.component.html',
  styleUrls: ['./application-creation.component.scss'],
})
export class ApplicationCreationComponent implements OnInit {
  data = {
    classroom: null as number | null,
    message: '',
  };
  classroom?: Classroom;
  loading = false;
  validated = false;
  idChange$ = new Subject();

  constructor(
    private notifier: NotifierService,
    private createGql: JoinApplicationCreateGQL,
    private applicationListGql: JoinApplicationListGQL,
    private classroomGql: ClassroomDetailGQL,
    private popup: PopupComponent,
  ) {}

  ngOnInit() {
    this.idChange$
      .pipe(
        tap(() => (this.validated = false)),
        debounceTime(300),
      )
      .subscribe(() => {
        this.validateClassroom();
      });
  }

  send() {
    if (this.loading) return;

    this.loading = true;
    const data = { ...this.data, classroom: this.data.classroom + '' };
    this.createGql
      .mutate(
        { data },
        {
          update: (_, result) => {
            const query = this.applicationListGql.watch();
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

  validateClassroom() {
    if (this.data.classroom)
      this.classroomGql
        .fetch({ id: this.data.classroom + '' })
        .pipe(map((result) => result.data.classroom))
        .subscribe(
          (result) => {
            this.classroom = result;
            this.validated = true;
          },
          () => {
            this.classroom = undefined;
            this.validated = false;
          },
        );
    else {
      this.classroom = undefined;
      this.validated = false;
    }
  }
}

type Classroom = ClassroomDetailQuery['classroom'];
