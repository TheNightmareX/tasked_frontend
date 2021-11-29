import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomListGQL, RoomListQuery } from 'src/app/graphql';

type Room = RoomListQuery['rooms']['results'][number];

@Component({
  selector: 'app-layout-main-sidenav-rooms',
  templateUrl: './layout-main-sidenav-rooms.component.html',
  styleUrls: ['./layout-main-sidenav-rooms.component.scss'],
})
export class LayoutMainSidenavRoomsComponent implements OnInit {
  rooms$!: Observable<Room[]>;

  constructor(private router: Router, private roomListGql: RoomListGQL) {}

  trackByRoom: TrackByFunction<Room> = (_, { id }) => id;

  ngOnInit() {
    this.rooms$ = this.roomListGql
      .watch()
      .valueChanges.pipe(map(({ data }) => data.rooms.results));
  }

  deactivateIfActivated(room: Room) {
    if (this.isRoomActivated(room.id)) this.router.navigate(['/rooms']);
  }

  private isRoomActivated(id: string) {
    const tree = this.router.createUrlTree(['/rooms', id]);
    const isActive = this.router.isActive(tree, {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
    return isActive;
  }
}
