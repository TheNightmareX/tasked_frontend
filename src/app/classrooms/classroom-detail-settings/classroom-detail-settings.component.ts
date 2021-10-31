import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, forkJoin, Observable, of, Subject, timer } from 'rxjs';
import { catchError, debounceTime, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  ClassroomUpdateGQL,
  ClassroomUpdateInput,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';

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
  isCreator!: Observable<boolean>;
  modified$!: Observable<boolean>;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private formData: FormDataService,
    private notifier: NotifierService,
    private queryGql: ClassroomDetailGQL,
    private updateGql: ClassroomUpdateGQL,
  ) {}

  ngOnInit() {
    this.route.parent!.paramMap.subscribe((params) => {
      this.classroom$ = this.queryGql
        .watch({ id: params.get('id')! })
        .valueChanges.pipe(map((result) => result.data.classroom));

      this.isCreator = combineLatest([this.classroom$, this.auth.user$]).pipe(
        map(([classroom, user]) => classroom.creator.id == user!.id),
      );

      this.modified$ = combineLatest([this.classroom$, this.change$]).pipe(
        debounceTime(100),
        map(([classroom]) => this.formData.isModified(this.data, classroom)),
      );
    });

    this.reset();
  }

  reset() {
    this.classroom$.pipe(take(1)).subscribe((classroom) => {
      const currentValues = this.formData.pick(classroom, [
        'name',
        'description',
        'isOpen',
      ]);
      this.data = currentValues;
      this.change$.next();
    });
  }

  save() {
    this.classroom$.pipe(take(1)).subscribe((classroom) => {
      const data = this.formData.filterUnchanged({ ...this.data }, classroom);
      this.loading = true;
      forkJoin([
        this.updateGql
          .mutate({ id: classroom.id, data })
          .pipe(catchError(() => of(null))),
        timer(1000),
      ]).subscribe(([result]) => {
        if (result)
          this.notifier.notify(
            NotificationType.Success,
            'Changes have been saved successfully',
          );
        else
          this.notifier.notify(
            NotificationType.Error,
            'Failed to save the changes',
          );
        this.loading = false;
      });
    });
  }
}
