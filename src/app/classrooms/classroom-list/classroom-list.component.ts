import { Component, OnInit, TrackByFunction } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassroomListGQL,
  ClassroomListQuery,
  ClassroomListQueryVariables,
} from 'src/app/graphql';

type Classroom = ClassroomListQuery['classrooms']['results'][number];

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class ClassroomListComponent implements OnInit {
  classrooms$: Observable<Classroom[]> = of();

  private classroomsQuery!: QueryRef<
    ClassroomListQuery,
    ClassroomListQueryVariables
  >;

  constructor(private classroomListGql: ClassroomListGQL) {}

  trackByClassroom: TrackByFunction<Classroom> = (_, { id }) => id;

  ngOnInit() {
    this.classroomsQuery = this.classroomListGql.watch();
    this.classrooms$ = this.classroomsQuery.valueChanges.pipe(
      map(({ data }) => data.classrooms.results),
    );
  }
}
