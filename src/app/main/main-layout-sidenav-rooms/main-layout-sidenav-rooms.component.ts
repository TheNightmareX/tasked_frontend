import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoomListGQL, RoomListQuery } from 'src/app/graphql';

type Room = RoomListQuery['rooms']['results'][number];

@Component({
  selector: 'app-main-layout-sidenav-rooms',
  templateUrl: './main-layout-sidenav-rooms.component.html',
  styleUrls: ['./main-layout-sidenav-rooms.component.scss'],
})
export class MainLayoutSidenavRoomsComponent implements OnInit {
  rooms$!: Observable<Room[]>;

  constructor(private router: Router, private roomListGql: RoomListGQL) {}

  trackByRoom: TrackByFunction<Room> = (_, { id }) => id;

  ngOnInit() {
    this.rooms$ = this.roomListGql
      .watch({ joinedOnly: true })
      .valueChanges.pipe(map(({ data }) => data.rooms.results));
  }

  deactivateIfActivated(path: string) {
    if (this.isRouteActivated(path)) this.router.navigate(['/app/rooms']);
  }

  private isRouteActivated(path: string) {
    const tree = this.router.createUrlTree(['/app/rooms', path]);
    const isActive = this.router.isActive(tree, {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
    return isActive;
  }
}
