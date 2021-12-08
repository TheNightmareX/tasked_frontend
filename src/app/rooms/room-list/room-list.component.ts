import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { RoomListGQL, RoomListQuery } from 'src/app/graphql';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
  rooms$: Observable<Room[]> = of([]);
  searchValue = '';
  loading = false;

  constructor(private listGql: RoomListGQL) {}

  ngOnInit() {}

  search() {
    if (this.loading || !this.searchValue) return;
    this.loading = true;
    this.rooms$ = this.listGql
      .fetch(
        { filter: { name__like: `%${this.searchValue}%` } },
        { fetchPolicy: 'network-only' },
      )
      .pipe(
        leastTime(500),
        map((result) => result.data.rooms.results),
        finalize(() => (this.loading = false)),
      );
  }
}

type Room = RoomListQuery['rooms']['results'][number];
