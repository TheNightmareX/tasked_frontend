import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, finalize, first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { filterKeys } from 'src/app/common/filter-keys.func';
import { isEmpty } from 'src/app/common/is-empty.func';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { pick } from 'src/app/common/pick.func';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  ClassroomUpdateGQL,
  ClassroomUpdateInput,
} from 'src/app/graphql';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail-settings',
  templateUrl: './classroom-detail-settings.component.html',
  styleUrls: ['./classroom-detail-settings.component.css'],
})
export class ClassroomDetailSettingsComponent implements OnInit {
  data: ClassroomUpdateInput = {
    name: '',
    description: '',
    isOpen: false,
  };

  change$ = new Subject();
  classroom$!: Observable<Classroom>;
  isCreator$!: Observable<boolean>;
  modified$!: Observable<boolean>;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: NotifierService,
    private queryGql: ClassroomDetailGQL,
    private updateGql: ClassroomUpdateGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;

    this.classroom$ = this.queryGql
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.classroom));

    this.isCreator$ = combineLatest([this.classroom$, this.auth.user$]).pipe(
      map(([classroom, user]) => classroom.creator.id == user!.id),
    );

    this.modified$ = combineLatest([this.classroom$, this.change$]).pipe(
      debounceTime(100),
      map(([classroom]) =>
        isEmpty(filterKeys(this.data, (v, k) => v != classroom[k])),
      ),
    );

    this.reset();
  }

  reset() {
    this.classroom$.pipe(first()).subscribe((classroom) => {
      const currentValues = pick(classroom, ['name', 'description', 'isOpen']);
      this.data = currentValues;
      this.change$.next();
    });
  }

  save() {
    this.classroom$.pipe(first()).subscribe((classroom) => {
      const data = filterKeys(this.data, (v, k) => v != classroom[k]);
      this.loading = true;
      this.updateGql
        .mutate({ id: classroom.id, data })
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
              $localize`Changes have been saved successfully`,
            );
          },
          () => {
            this.notifier.notify(
              NotificationType.Error,
              $localize`Failed to save the changes`,
            );
          },
        );
    });
  }
}
