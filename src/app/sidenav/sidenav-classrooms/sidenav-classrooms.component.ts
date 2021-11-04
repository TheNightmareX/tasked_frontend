import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomListGQL, ClassroomListQuery } from 'src/app/graphql';

type Classroom = ClassroomListQuery['classrooms']['results'][number];

@Component({
  selector: 'app-sidenav-classrooms',
  templateUrl: './sidenav-classrooms.component.html',
  styleUrls: ['./sidenav-classrooms.component.css'],
})
export class SidenavClassroomsComponent implements OnInit {
  classrooms$!: Observable<Classroom[]>;

  constructor(
    private router: Router,
    private classroomListGql: ClassroomListGQL,
  ) {}

  trackByClassroom: TrackByFunction<Classroom> = (_, { id }) => id;

  ngOnInit() {
    this.classrooms$ = this.classroomListGql
      .watch()
      .valueChanges.pipe(map(({ data }) => data.classrooms.results));
  }

  deactivateIfActivated(classroom: Classroom) {
    if (this.isClassroomActivated(classroom.id))
      this.router.navigate(['/classrooms']);
  }

  private isClassroomActivated(id: string) {
    const tree = this.router.createUrlTree(['/classrooms', id]);
    const isActive = this.router.isActive(tree, {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
    return isActive;
  }
}
