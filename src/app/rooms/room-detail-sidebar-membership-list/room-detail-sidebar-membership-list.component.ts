import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  RoomDetailGQL,
  RoomMembershipListGQL,
  RoomMembershipListQuery,
  Role,
} from 'src/app/graphql';

type Membership =
  RoomMembershipListQuery['room']['memberships']['results'][number];

@Component({
  selector: 'app-room-detail-sidebar-membership-list',
  templateUrl: './room-detail-sidebar-membership-list.component.html',
  styleUrls: ['./room-detail-sidebar-membership-list.component.scss'],
})
export class RoomDetailSidebarMembershipListComponent implements OnInit {
  memberships$!: Observable<Membership[]>;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private listGql: RoomMembershipListGQL,
    private roomGql: RoomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.memberships$ = combineLatest([
        this.listGql
          .watch({ id })
          .valueChanges.pipe(
            map((result) => [...result.data.room.memberships.results]),
          ),
        this.roomGql
          .watch({ id })
          .valueChanges.pipe(map((result) => result.data.room)),
        this.auth.user$,
      ]).pipe(
        map(([memberships, room, user]) =>
          memberships
            .sort((a, b) =>
              a.owner.id == user!.id ? -1 : b.owner.id == user!.id ? 1 : 0,
            )
            .sort((a, b) =>
              a.owner.id == room.creator.id
                ? -1
                : b.owner.id == room.creator.id
                ? 1
                : a.role == b.role
                ? 0
                : a.role == Role.Manager
                ? -1
                : 1,
            ),
        ),
      );
    });
  }
}
