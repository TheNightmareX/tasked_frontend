import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClassroomsStateService } from 'src/app/classrooms/classrooms-state.service';
import { BreakpointsService } from 'src/app/core/breakpoints.service';
import { ClassroomDetailGQL, ClassroomDetailQuery } from 'src/app/graphql';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css'],
})
export class ClassroomDetailComponent implements OnInit {
  classroom$: Observable<Classroom>;

  private classroomQuery = this.classroomDetailGql.watch();

  constructor(
    public breakpoints: BreakpointsService,
    private route: ActivatedRoute,
    private state: ClassroomsStateService,
    private classroomDetailGql: ClassroomDetailGQL,
  ) {
    this.classroomQuery = this.classroomDetailGql.watch();
    this.classroom$ = this.classroomQuery.valueChanges.pipe(
      map(({ data }) => data.classroom),
    );
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((value): value is string => !!value),
        map((value) => +value),
      )
      .subscribe((classroomId) => {
        this.state.activeId = classroomId;
        this.classroomQuery.refetch({ id: classroomId + '' });
      });
  }
}
