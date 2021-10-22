import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
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
  classrooms$!: Observable<Classroom[]>;

  private classroomsQuery!: QueryRef<
    ClassroomListQuery,
    ClassroomListQueryVariables
  >;

  constructor(
    private router: Router,
    private classroomListGql: ClassroomListGQL,
  ) {}

  trackByClassroom: TrackByFunction<Classroom> = (_, { id }) => id;

  ngOnInit() {
    this.classroomsQuery = this.classroomListGql.watch();
    this.classrooms$ = this.classroomsQuery.valueChanges.pipe(
      map(({ data }) => data.classrooms.results),
    );
  }

  deactivateIfActivated(classroom: Classroom) {
    if (this.isRouteActive(this.getRouterCommands(classroom.id)))
      this.router.navigate(this.getRouterCommands());
  }

  getRouterCommands(id?: string) {
    const commands = ['/classrooms'];
    if (id) commands.push(id);
    return commands;
  }

  private isRouteActive(commands: unknown[]) {
    const tree = this.router.createUrlTree(commands);
    const isActive = this.router.isActive(tree, {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
    return isActive;
  }
}
