import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, finalize, first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { filterKeys } from 'src/app/common/filter-keys.func';
import { isEmpty } from 'src/app/common/is-empty.func';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { pick } from 'src/app/common/pick.func';
import {
  RoomDetailGQL,
  RoomDetailQuery,
  RoomUpdateGQL,
  RoomUpdateInput,
} from 'src/app/graphql';

type Room = RoomDetailQuery['room'];

@Component({
  selector: 'app-room-detail-settings',
  templateUrl: './room-detail-settings.component.html',
  styleUrls: ['./room-detail-settings.component.scss'],
})
export class RoomDetailSettingsComponent implements OnInit {
  data: RoomUpdateInput = {
    name: '',
    description: '',
    isOpen: false,
  };

  change$ = new Subject();
  room$!: Observable<Room>;
  isCreator$!: Observable<boolean>;
  modified$!: Observable<boolean>;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: NotifierService,
    private queryGql: RoomDetailGQL,
    private updateGql: RoomUpdateGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;

    this.room$ = this.queryGql
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.room));

    this.isCreator$ = combineLatest([this.room$, this.auth.user$]).pipe(
      map(([room, user]) => room.creator.id == user!.id),
    );

    this.modified$ = combineLatest([this.room$, this.change$]).pipe(
      debounceTime(100),
      map(([room]) => isEmpty(filterKeys(this.data, (v, k) => v != room[k]))),
    );

    this.reset();
  }

  reset() {
    this.room$.pipe(first()).subscribe((room) => {
      const currentValues = pick(room, ['name', 'description', 'isOpen']);
      this.data = currentValues;
      this.change$.next();
    });
  }

  save() {
    this.room$.pipe(first()).subscribe((room) => {
      const data = filterKeys(this.data, (v, k) => v != room[k]);
      this.loading = true;
      this.updateGql
        .mutate({ id: room.id, data })
        .pipe(
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
