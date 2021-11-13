import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassroomAssignmentListGQL,
  ClassroomAssignmentListQuery,
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

  constructor(
    private route: ActivatedRoute,
    private listGql: ClassroomAssignmentListGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    const assignments$ = this.listGql
      .watch({ id, isOwn: true })
      .valueChanges.pipe(
        map(({ data }) =>
          [...data.classroom.assignments.results]
            .sort((a, b) =>
              a.isPublic == b.isPublic ? 0 : a.isPublic ? -1 : 1,
            )
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
