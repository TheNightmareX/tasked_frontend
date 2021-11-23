import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  ClassroomMembershipListDocument,
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
  sidebarOpened$!: Observable<boolean>;
  sidebarMode$!: Observable<MatDrawerMode>;

  classroom$!: Observable<Classroom>;

  links: TabLink[] = [];

  constructor(
    private route: ActivatedRoute,
    private media: MediaObserver,
    private local: ClassroomsLocalStorageService,
    private auth: AuthService,
    private classroomDetailGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.sidebarOpened$ = this.media
      .asObservable()
      .pipe(
        map((items) =>
          items.some((item) => item.mqAlias == 'gt-sm' && item.matches),
        ),
      );
    this.sidebarMode$ = this.sidebarOpened$.pipe(
      map((value) => (value ? 'side' : 'over')),
    );

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.auth.user$.pipe(first()).subscribe((user) => {
        const map = this.local.lastActivatedClassroomMap;
        map.value[user!.id] = id;
        map.save();
      });

      this.classroom$ = this.classroomDetailGql.watch({ id }).valueChanges.pipe(
        map(({ data }) => data.classroom),
        tap((classroom) => {
          this.links = [
            classroom.membership!.role == Role.Student
              ? ['Assignments', ['assignments']]
              : ['Tasks', ['tasks']],
            ['Settings', ['settings']],
          ];
        }),
      );
    });
  }
}

type TabLink = [title: string, commands: string[]];
