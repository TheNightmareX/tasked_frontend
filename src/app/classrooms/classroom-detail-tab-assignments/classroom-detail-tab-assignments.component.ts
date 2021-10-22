import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomDetailGQL, Role } from 'src/app/graphql';
import { ClassroomsStateService } from '../classrooms-state.service';

@Component({
  selector: 'app-classroom-detail-tab-assignments',
  templateUrl: './classroom-detail-tab-assignments.component.html',
  styleUrls: ['./classroom-detail-tab-assignments.component.css'],
})
export class ClassroomDetailTabAssignmentsComponent implements OnInit {
  isTeacher$!: Observable<boolean>;

  constructor(
    private state: ClassroomsStateService,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.isTeacher$ = this.classroomGql
      .watch({ id: this.state.activeId! })
      .valueChanges.pipe(
        map(({ data }) => data.classroom.membership.role == Role.Teacher),
      );
  }
}
