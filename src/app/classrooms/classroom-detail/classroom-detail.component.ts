import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
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
  sidebarOpen$!: Observable<boolean>;

  classroom$!: Observable<Classroom>;

  links: TabLink[] = [
    ['Assignments', ['assignments']],
    ['Settings', ['settings']],
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private media: MediaObserver,
    private local: ClassroomsLocalStorageService,
    private auth: AuthService,
    private classroomDetailGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.sidebarOpen$ = this.media
      .asObservable()
      .pipe(
        map((items) =>
          items.some((item) => item.mqAlias == 'gt-sm' && item.matches),
        ),
      );
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.auth.user$.pipe(take(1)).subscribe((user) => {
        this.local.lastActivatedClassroomMap[user!.id] = id;
      });

      this.classroom$ = this.classroomDetailGql
        .watch({ id })
        .valueChanges.pipe(map(({ data }) => data.classroom));

      this.classroom$.pipe(take(1)).subscribe((classroom) => {
        if (classroom.membership.role == Role.Student)
          this.router.navigate(this.links[0][1], { relativeTo: this.route });
        // TODO: navigate to a assignments management page when the role is teacher
      });
    });
  }
}

type TabLink = [title: string, commands: string[]];
