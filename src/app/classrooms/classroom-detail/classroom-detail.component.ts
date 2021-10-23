import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointsService } from 'src/app/core/breakpoints.service';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  ClassroomDetailQueryVariables,
} from 'src/app/graphql';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css'],
})
export class ClassroomDetailComponent implements OnInit {
  classroom$!: Observable<Classroom>;

  private classroomQuery!: QueryRef<
    ClassroomDetailQuery,
    ClassroomDetailQueryVariables
  >;

  constructor(
    public breakpoints: BreakpointsService,
    private route: ActivatedRoute,
    private classroomDetailGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classroomQuery = this.classroomDetailGql.watch({
        id: params.get('id')!,
      });
      this.classroom$ = this.classroomQuery.valueChanges.pipe(
        map(({ data }) => data.classroom),
      );
    });
  }
}
