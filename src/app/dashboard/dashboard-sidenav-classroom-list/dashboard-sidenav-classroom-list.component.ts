import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListClassroomsGQL, ListClassroomsQuery } from 'src/app/graphql';

type Classroom = ListClassroomsQuery['classrooms']['results'][number];

@Component({
  selector: 'app-dashboard-sidenav-classroom-list',
  templateUrl: './dashboard-sidenav-classroom-list.component.html',
  styleUrls: ['./dashboard-sidenav-classroom-list.component.css'],
})
export class DashboardSidenavClassroomListComponent implements OnInit {
  classrooms: Observable<Classroom[]> = of([]);

  constructor(private listClassroomsGql: ListClassroomsGQL) {}

  trackByClassroom: TrackByFunction<Classroom> = (_, { id }) => id;

  ngOnInit() {
    this.classrooms = this.listClassroomsGql
      .fetch()
      .pipe(map(({ data }) => data.classrooms.results));
  }
}
