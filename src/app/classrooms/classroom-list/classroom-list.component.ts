import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  classrooms$!: Observable<Classroom[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      this.router.navigate(['../'], { relativeTo: this.route });
  }

  private isClassroomActivated(id: string) {
    const tree = this.router.createUrlTree([id], { relativeTo: this.route });
    const isActive = this.router.isActive(tree, {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
    return isActive;
  }
}
