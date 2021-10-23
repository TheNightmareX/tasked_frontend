import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomDetailGQL, ClassroomDetailQuery } from 'src/app/graphql';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail-sidebar',
  templateUrl: './classroom-detail-sidebar.component.html',
  styleUrls: ['./classroom-detail-sidebar.component.css'],
})
export class ClassroomDetailSidebarComponent implements OnInit {
  classroom$: Observable<Classroom> = of();

  constructor(
    private route: ActivatedRoute,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classroom$ = this.classroomGql
        .watch({ id: params.get('id')! })
        .valueChanges.pipe(map((result) => result.data.classroom));
    });
  }
}
