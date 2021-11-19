import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {
  ClassroomAssignmentListGQL,
  ClassroomAssignmentListQuery,
  ClassroomAssignmentListQueryVariables,
} from 'src/app/graphql';

type Assignment =
  ClassroomAssignmentListQuery['classroom']['assignments']['results'][number];

@Component({
  selector: 'app-classroom-detail-assignments',
  templateUrl: './classroom-detail-assignments.component.html',
  styleUrls: ['./classroom-detail-assignments.component.css'],
})
export class ClassroomDetailAssignmentsComponent implements OnInit {
  assignmentsPending$!: Observable<Assignment[]>;
  assignmentsCompleted$!: Observable<Assignment[]>;
  loading = false;
  allLoaded = false;

  private query!: QueryRef<
    ClassroomAssignmentListQuery,
    ClassroomAssignmentListQueryVariables
  >;

  constructor(
    private route: ActivatedRoute,
    private listGql: ClassroomAssignmentListGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    this.query = this.listGql.watch({ id, isOwn: true });
    const assignments$ = this.query.valueChanges.pipe(
      map(({ data }) =>
        [...data.classroom.assignments.results].sort((a, b) =>
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

    const data = this.query.getCurrentResult().data.classroom.assignments;

    this.loading = true;
    from(this.query.fetchMore({ variables: { offset: data.results.length } }))
      .pipe(
        map((result) => result.data.classroom.assignments),
        finalize(() => (this.loading = false)),
      )
      .subscribe(({ results, total }) => {
        this.allLoaded = results.length >= total;
        this.query.updateQuery((prev) => ({
          ...prev,
          classroom: {
            ...prev.classroom,
            assignments: {
              ...prev.classroom.assignments,
              total,
              results: [...prev.classroom.assignments.results, ...results],
            },
          },
        }));
      });
  }
}
