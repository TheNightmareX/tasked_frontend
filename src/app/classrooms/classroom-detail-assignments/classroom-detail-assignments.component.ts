import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassroomAssignmentListGQL,
  ClassroomAssignmentListQuery,
  ClassroomAssignmentListQueryVariables,
} from 'src/app/graphql';
import { ClassroomsStateService } from '../classrooms-state.service';

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
      map(({ data }) => data.classroom.assignments.results),
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
