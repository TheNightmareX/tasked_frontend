import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    forkJoin([
      timer(1000),
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
        .pipe(catchError(() => of(null))),
    ])
      .pipe(map((results) => results[1]))
      .subscribe((result) => {
        this.loading = false;
        if (result) {
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
        } else {
          this.notifier.notify(
            NotificationType.Error,
            'Failed to create the classroom',
          );
        }
      });
  }
}
