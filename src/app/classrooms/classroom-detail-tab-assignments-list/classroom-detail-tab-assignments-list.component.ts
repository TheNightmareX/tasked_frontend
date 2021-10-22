import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassroomAssignmentListQuery,
  ClassroomAssignmentListQueryVariables,
  ClassroomAssignmentListGQL,
} from 'src/app/graphql';
import { ClassroomsStateService } from '../classrooms-state.service';

type Assignment =
  ClassroomAssignmentListQuery['classroom']['assignments']['results'][number];

@Component({
  selector: 'app-classroom-detail-tab-assignments-list',
  templateUrl: './classroom-detail-tab-assignments-list.component.html',
  styleUrls: ['./classroom-detail-tab-assignments-list.component.css'],
})
export class ClassroomDetailTabAssignmentsListComponent implements OnInit {
  assignmentsPending$!: Observable<Assignment[]>;
  assignmentsCompleted$!: Observable<Assignment[]>;

  private query!: QueryRef<
    ClassroomAssignmentListQuery,
    ClassroomAssignmentListQueryVariables
  >;

  constructor(
    private state: ClassroomsStateService,
    private listGql: ClassroomAssignmentListGQL,
  ) {}

  ngOnInit() {
    this.query = this.listGql.watch({
      id: this.state.activeId!,
    });
    const assignments$ = this.query.valueChanges.pipe(
      map(({ data }) =>
        [...data.classroom.assignments.results]
          .sort((a, b) => (a.isPublic == b.isPublic ? 0 : a.isPublic ? -1 : 1))
          .sort((a, b) =>
            a.isImportant == b.isImportant ? 0 : a.isImportant ? -1 : 1,
          ),
      ),
    );
    this.assignmentsPending$ = assignments$.pipe(
      map((assignments) =>
        assignments.filter((assignment) => !assignment.isCompleted),
      ),
    );
    this.assignmentsCompleted$ = assignments$.pipe(
      map((assignments) =>
        assignments.filter((assignment) => assignment.isCompleted),
      ),
    );
  }
}
