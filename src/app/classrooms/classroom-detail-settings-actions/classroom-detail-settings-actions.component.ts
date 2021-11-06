import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { concatMap, finalize, first, map } from 'rxjs/operators';
import {
  ClassroomDeleteGQL,
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  MembershipDeleteGQL,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail-settings-actions',
  templateUrl: './classroom-detail-settings-actions.component.html',
  styleUrls: ['./classroom-detail-settings-actions.component.css'],
})
export class ClassroomDetailSettingsActionsComponent implements OnInit {
  @Input()
  admin = false;

  loading = false;

  private classroom$!: Observable<Classroom>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private apollo: Apollo,
    private classroomGql: ClassroomDetailGQL,
    private membershipDeleteGql: MembershipDeleteGQL,
    private classroomDeleteGql: ClassroomDeleteGQL,
  ) {}

  ngOnInit() {
    this.route.parent!.paramMap.subscribe((params) => {
      this.classroom$ = this.classroomGql
        .watch({ id: params.get('id')! })
        .valueChanges.pipe(map((result) => result.data.classroom));
    });
  }

  exit() {
    this.mutate(
      (classroom) =>
        this.membershipDeleteGql.mutate({ id: classroom.membership!.id }),
      `Exited the classroom`,
      'Failed to exit the classroom',
    );
  }

  disband() {
    this.mutate(
      (classroom) => this.classroomDeleteGql.mutate({ id: classroom.id }),
      `Disbanded the classroom`,
      'Failed to disband the classroom',
    );
  }

  private mutate<T>(
    mutation: (classroom: Classroom) => Observable<T>,
    messageOnSucceed: string,
    messageOnFail: string,
  ) {
    if (this.loading) return;
    this.loading = true;
    this.classroom$
      .pipe(
        concatMap((classroom) =>
          mutation(classroom).pipe(
            map((result) => [result, classroom] as const),
          ),
        ),
        first(),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        ([result, classroom]) => {
          this.notifier.notify(NotificationType.Success, messageOnSucceed);
          this.router.navigate(['/classrooms']);
          const cache = this.apollo.client.cache;
          cache.evict({ id: cache.identify(classroom) });
        },
        () => {
          this.notifier.notify(NotificationType.Error, messageOnFail);
        },
      );
  }
}
