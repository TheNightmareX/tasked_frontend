import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import {
  RoomTaskListGQL,
  RoomTaskListQuery,
  RoomTaskListQueryVariables,
} from 'src/app/graphql';

type Task = RoomTaskListQuery['room']['tasks']['results'][number];

@Component({
  selector: 'app-room-detail-tasks',
  templateUrl: './room-detail-tasks.component.html',
  styleUrls: ['./room-detail-tasks.component.scss'],
})
export class RoomDetailTasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  loading = false;
  allLoaded = false;

  private query!: QueryRef<RoomTaskListQuery, RoomTaskListQueryVariables>;

  constructor(
    private route: ActivatedRoute,
    private listGql: RoomTaskListGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    this.query = this.listGql.watch({ id });
    this.tasks$ = this.query.valueChanges.pipe(
      map((result) => result.data.room.tasks),
      tap(({ results, total }) => (this.allLoaded = results.length >= total)),
      map(({ results }) => results),
    );
  }

  identifyTask(index: number, task: Task) {
    return task.id;
  }

  fetchMore() {
    if (this.allLoaded || this.loading) return;

    const current = this.query.getCurrentResult().data.room.tasks;
    this.loading = true;
    from(
      this.query.fetchMore({ variables: { offset: current.results.length } }),
    )
      .pipe(
        map((result) => result.data.room.tasks),
        finalize(() => (this.loading = false)),
      )
      .subscribe(({ results, total }) => {
        this.query.updateQuery((prev) => ({
          ...prev,
          room: {
            ...prev.room,
            tasks: {
              ...prev.room.tasks,
              total,
              results: [...prev.room.tasks.results, ...results],
            },
          },
        }));
      });
  }
}
