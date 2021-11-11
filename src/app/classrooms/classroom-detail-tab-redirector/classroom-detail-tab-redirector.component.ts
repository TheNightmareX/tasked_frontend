import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomDetailGQL, Role } from 'src/app/graphql';

@Component({
  selector: 'app-classroom-detail-tab-redirector',
  templateUrl: './classroom-detail-tab-redirector.component.html',
  styleUrls: ['./classroom-detail-tab-redirector.component.css'],
})
export class ClassroomDetailTabRedirectorComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.classroomGql.fetch({ id }).subscribe((result) => {
      this.router.navigate([
        '/classrooms',
        id,
        result.data.classroom.membership!.role == Role.Student
          ? 'assignments'
          : 'tasks',
      ]);
    });
  }
}
