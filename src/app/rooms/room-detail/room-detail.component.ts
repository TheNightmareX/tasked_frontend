import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ThemesService } from 'src/app/core/themes.service';
import { RoomDetailGQL, RoomDetailQuery, Role } from 'src/app/graphql';
import { RoomsLocalStorageService } from '../rooms-local-storage.service';

type Room = RoomDetailQuery['room'];

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
})
export class RoomDetailComponent implements OnInit {
  sidebarOpened$!: Observable<boolean>;
  sidebarMode$!: Observable<MatDrawerMode>;

  room$!: Observable<Room>;

  links: TabLink[] = [];

  constructor(
    public themes: ThemesService,
    private route: ActivatedRoute,
    private media: MediaObserver,
    private local: RoomsLocalStorageService,
    private auth: AuthService,
    private roomDetailGql: RoomDetailGQL,
  ) {}

  ngOnInit() {
    this.sidebarOpened$ = this.media
      .asObservable()
      .pipe(
        map((items) =>
          items.some((item) => item.mqAlias == 'gt-sm' && item.matches),
        ),
      );
    this.sidebarMode$ = this.sidebarOpened$.pipe(
      map((value) => (value ? 'side' : 'over')),
    );

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.auth.user$.pipe(first()).subscribe((user) => {
        const map = this.local.lastActivatedRoomMap;
        map.value[user!.id] = id;
        map.save();
      });

      this.room$ = this.roomDetailGql.watch({ id }).valueChanges.pipe(
        map(({ data }) => data.room),
        tap((room) => {
          this.links = [
            room.membership!.role == Role.Student
              ? [$localize`Assignments`, ['assignments']]
              : [$localize`Tasks`, ['tasks']],
            [$localize`Settings`, ['settings']],
          ];
        }),
      );
    });
  }
}

type TabLink = [title: string, commands: string[]];
