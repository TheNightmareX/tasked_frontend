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
  rooms$!: Observable<Room[]>;
  searchValue = '';
  loading = false;

  constructor(private listGql: RoomListGQL) {}

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.loading) return;

    if (!this.searchValue) this.loadLocal();
    else this.loadSearch();
  }

  private loadLocal() {
    this.rooms$ = this.listGql
      .fetch({ joinedOnly: true })
      .pipe(map((result) => result.data.rooms.results));
  }

  private loadSearch() {
    const searchId = /^#(\d+)$/.exec(this.searchValue)?.[1];
    this.loading = true;
    this.rooms$ = this.listGql
      .fetch(
        {
          filter:
            searchId != undefined
              ? { id: searchId }
              : { name__like: `%${this.searchValue}%` },
        },
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
