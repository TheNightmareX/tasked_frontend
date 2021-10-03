import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BreakpointsService } from 'src/app/core/breakpoints.service';
import { ClassroomsStateService } from 'src/app/core/classrooms-state.service';
import { ClassroomDetailGQL, ClassroomDetailQuery } from 'src/app/graphql';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css'],
})
export class ClassroomDetailComponent implements OnInit {
  classroom$: Observable<Classroom> = of();

  constructor(
    public breakpoints: BreakpointsService,
    private route: ActivatedRoute,
    private state: ClassroomsStateService,
    private classroomDetailGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((value): value is string => !!value),
        map((value) => +value),
      )
      .subscribe((classroomId) => {
        this.state.activeId = classroomId;
        this.classroom$ = this.classroomDetailGql
          .fetch({ id: classroomId + '' })
          .pipe(map(({ data }) => data.classroom));
      });
  }
}
