import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BreakpointsService } from 'src/app/core/breakpoints.service';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  Role,
} from 'src/app/graphql';
import { ClassroomsLocalStorageService } from '../classrooms-local-storage.service';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css'],
})
export class ClassroomDetailComponent implements OnInit {
  classroom$!: Observable<Classroom>;

  links: TabLink[] = [['Assignments', ['assignments']]];

  constructor(
    public breakpoints: BreakpointsService,
    private router: Router,
    private route: ActivatedRoute,
    private local: ClassroomsLocalStorageService,
    private classroomDetailGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.local.lastActiveId = id;
      this.classroom$ = this.classroomDetailGql
        .watch({ id })
        .valueChanges.pipe(map(({ data }) => data.classroom));

      this.classroom$.pipe(take(1)).subscribe((classroom) => {
        if (classroom.membership.role == Role.Student)
          this.navigate(this.links[0]);
        // TODO: navigate to a assignments management page when the role is teacher
      });
    });
  }

  navigate(link: TabLink) {
    this.router.navigate(link[1], { relativeTo: this.route });
  }

  isLinkActive(link: TabLink) {
    const url = this.router.createUrlTree(link[1], { relativeTo: this.route });
    return this.router.isActive(url, {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });
  }
}

type TabLink = [title: string, commands: string[]];
