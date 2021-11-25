import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  ClassroomDetailGQL,
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  Role,
} from 'src/app/graphql';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];

@Component({
  selector: 'app-classroom-detail-sidebar-membership-list',
  templateUrl: './classroom-detail-sidebar-membership-list.component.html',
  styleUrls: ['./classroom-detail-sidebar-membership-list.component.css'],
})
export class ClassroomDetailSidebarMembershipListComponent implements OnInit {
  memberships$!: Observable<Membership[]>;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private listGql: ClassroomMembershipListGQL,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;

      this.memberships$ = combineLatest([
        this.listGql
          .watch({ id })
          .valueChanges.pipe(
            map((result) => [...result.data.classroom.memberships.results]),
          ),
        this.classroomGql
          .watch({ id })
          .valueChanges.pipe(map((result) => result.data.classroom)),
        this.auth.user$,
      ]).pipe(
        map(([memberships, classroom, user]) =>
          memberships
            .sort((a, b) =>
              a.owner.id == user!.id ? -1 : b.owner.id == user!.id ? 1 : 0,
            )
            .sort((a, b) =>
              a.owner.id == classroom.creator.id
                ? -1
                : b.owner.id == classroom.creator.id
                ? 1
                : a.role == b.role
                ? 0
                : a.role == Role.Teacher
                ? -1
                : 1,
            ),
        ),
      );
    });
  }
}
