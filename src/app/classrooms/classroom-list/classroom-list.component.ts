import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomListGQL, ClassroomListQuery } from 'src/app/graphql';

type Classroom = ClassroomListQuery['classrooms']['results'][number];

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class ClassroomListComponent implements OnInit {
  classrooms$: Observable<Classroom[]>;

  private classroomsQuery;

  constructor(private classroomListGql: ClassroomListGQL) {
    this.classroomsQuery = this.classroomListGql.watch();
    this.classrooms$ = this.classroomsQuery.valueChanges.pipe(
      map(({ data }) => data.classrooms.results),
    );
  }

  trackByClassroom: TrackByFunction<Classroom> = (_, { id }) => id;

  ngOnInit() {}
}
