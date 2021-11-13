import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ApolloHelperService } from 'src/app/core/apollo-helper.service';
import {
  ClassroomCreateGQL,
  ClassroomListGQL,
  ClassroomListQuery,
} from 'src/app/graphql';

@Component({
  selector: 'app-classroom-creation',
  templateUrl: './classroom-creation.component.html',
  styleUrls: ['./classroom-creation.component.css'],
})
export class ClassroomCreationComponent implements OnInit {
  data = {
    name: '',
    description: '',
  };

  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private createGql: ClassroomCreateGQL,
    private listGql: ClassroomListGQL,
    private apolloHelper: ApolloHelperService,
  ) {}

  ngOnInit() {}

  submit() {
    this.loading = true;
    this.createGql
      .mutate(
        { data: this.data },
        {
          update: (_, result) => {
            this.apolloHelper.updateQueryCache<ClassroomListQuery>({
              query: this.listGql.document,
              data: (prev) => ({
                ...prev,
                classrooms: {
                  ...prev.classrooms,
                  total: prev.classrooms.total + 1,
                  results: [
                    ...prev.classrooms.results,
                    result.data!.createClassroom,
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
        (result) => {
          this.notifier.notify(
            NotificationType.Success,
            'Classroom created successfully',
          );
          this.router.navigate(
            ['/classrooms', result.data!.createClassroom.id],
            {
              relativeTo: this.route,
            },
          );
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            'Failed to create the classroom',
          );
        },
      );
  }
}
