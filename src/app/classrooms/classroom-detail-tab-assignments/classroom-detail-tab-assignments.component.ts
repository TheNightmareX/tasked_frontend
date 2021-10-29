import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomDetailGQL, Role } from 'src/app/graphql';

@Component({
  selector: 'app-classroom-detail-tab-assignments',
  templateUrl: './classroom-detail-tab-assignments.component.html',
  styleUrls: ['./classroom-detail-tab-assignments.component.css'],
})
export class ClassroomDetailTabAssignmentsComponent implements OnInit {
  isTeacher$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.parent!.paramMap.subscribe((params) => {
      this.isTeacher$ = this.classroomGql
        .watch({ id: params.get('id')! })
        .valueChanges.pipe(
          map(({ data }) => data.classroom.membership.role == Role.Teacher),
        );
    });
  }
}
