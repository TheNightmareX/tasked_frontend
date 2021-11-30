import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import {
  RoomAssignmentListGQL,
  RoomAssignmentListQuery,
  RoomAssignmentListQueryVariables,
} from 'src/app/graphql';

type Assignment =
  RoomAssignmentListQuery['room']['assignments']['results'][number];

@Component({
  selector: 'app-room-detail-assignments',
  templateUrl: './room-detail-assignments.component.html',
  styleUrls: ['./room-detail-assignments.component.scss'],
})
export class RoomDetailAssignmentsComponent implements OnInit {
  assignmentsPending$!: Observable<Assignment[]>;
  assignmentsCompleted$!: Observable<Assignment[]>;
  loading = false;
  allLoaded = false;

  private query!: QueryRef<
    RoomAssignmentListQuery,
    RoomAssignmentListQueryVariables
  >;

  constructor(
    private route: ActivatedRoute,
    private listGql: RoomAssignmentListGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    this.query = this.listGql.watch({ id, isOwn: true });
    const assignments$ = this.query.valueChanges.pipe(
      map((result) => result.data.room.assignments),
      tap(({ results, total }) => (this.allLoaded = results.length >= total)),
      map(({ results }) =>
        [...results].sort((a, b) =>
          a.isImportant == b.isImportant ? 0 : a.isImportant ? -1 : 1,
        ),
      ),
    );
    this.assignmentsPending$ = assignments$.pipe(
      map((items) => items.filter((item) => !item.isCompleted)),
    );
    this.assignmentsCompleted$ = assignments$.pipe(
      map((items) => items.filter((item) => item.isCompleted)),
    );
  }

  fetchMore() {
    if (this.allLoaded) return;
    if (this.loading) return;

    const data = this.query.getCurrentResult().data.room.assignments;

    this.loading = true;
    from(this.query.fetchMore({ variables: { offset: data.results.length } }))
      .pipe(
        map((result) => result.data.room.assignments),
        finalize(() => (this.loading = false)),
      )
      .subscribe(({ results, total }) => {
        this.query.updateQuery((prev) => ({
          ...prev,
          room: {
            ...prev.room,
            assignments: {
              ...prev.room.assignments,
              total,
              results: [...prev.room.assignments.results, ...results],
            },
          },
        }));
      });
  }
}