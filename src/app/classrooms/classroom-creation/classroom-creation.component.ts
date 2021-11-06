import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  ClassroomCreateGQL,
  ClassroomListGQL,
  ClassroomListQuery,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';

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
            update: (cache, result) => {
              const prev = cache.readQuery<ClassroomListQuery>({
                query: this.listGql.document,
              });
              if (prev)
                cache.writeQuery<ClassroomListQuery>({
                  query: this.listGql.document,
                  data: {
                    ...prev,
                    classrooms: {
                      ...prev.classrooms,
                      results: [
                        ...prev.classrooms.results,
                        result.data!.createClassroom,
                      ],
                    },
                  },
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
