import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { concatMap, finalize, first, map } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  RoomDeleteGQL,
  RoomDetailGQL,
  RoomDetailQuery,
  MembershipDeleteGQL,
} from 'src/app/graphql';

type Room = RoomDetailQuery['room'];

@Component({
  selector: 'app-room-detail-settings-actions',
  templateUrl: './room-detail-settings-actions.component.html',
  styleUrls: ['./room-detail-settings-actions.component.scss'],
})
export class RoomDetailSettingsActionsComponent implements OnInit {
  @Input() admin = false;
  loading = false;

  private room$!: Observable<Room>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private apollo: Apollo,
    private roomGql: RoomDetailGQL,
    private membershipDeleteGql: MembershipDeleteGQL,
    private roomDeleteGql: RoomDeleteGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    this.room$ = this.roomGql
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.room));
  }

  exit() {
    this.mutate(
      (room) => this.membershipDeleteGql.mutate({ id: room.membership!.id }),
      $localize`Exited the room`,
      $localize`Failed to exit the room`,
    );
  }

  disband() {
    this.mutate(
      (room) => this.roomDeleteGql.mutate({ id: room.id }),
      $localize`Disbanded the room`,
      $localize`Failed to disband the room`,
    );
  }

  private mutate<T>(
    mutation: (room: Room) => Observable<T>,
    messageOnSucceed: string,
    messageOnFail: string,
  ) {
    if (this.loading) return;
    this.loading = true;
    this.room$
      .pipe(
        concatMap((room) =>
          mutation(room).pipe(map((result) => [result, room] as const)),
        ),
        first(),
        leastTime(1000),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        ([result, room]) => {
          this.notifier.notify(NotificationType.Success, messageOnSucceed);
          this.router.navigate(['/rooms']);
          const cache = this.apollo.client.cache;
          cache.evict({ id: cache.identify(room) });
        },
        () => {
          this.notifier.notify(NotificationType.Error, messageOnFail);
        },
      );
  }
}
