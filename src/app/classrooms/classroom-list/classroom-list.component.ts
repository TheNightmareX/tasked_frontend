import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListClassroomsQuery, ListClassroomsGQL } from 'src/app/graphql';

type Classroom = ListClassroomsQuery['classrooms']['results'][number];

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class ClassroomListComponent implements OnInit {
  classrooms: Observable<Classroom[]> = of([]);

  constructor(private listClassroomsGql: ListClassroomsGQL) {}

  trackByClassroom: TrackByFunction<Classroom> = (_, { id }) => id;

  ngOnInit() {
    this.classrooms = this.listClassroomsGql
      .fetch()
      .pipe(map(({ data }) => data.classrooms.results));
  }
}
