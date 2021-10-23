import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  Role,
} from 'src/app/graphql';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];

@Component({
  selector: 'app-classroom-detail-membership-list',
  templateUrl: './classroom-detail-membership-list.component.html',
  styleUrls: ['./classroom-detail-membership-list.component.css'],
})
export class ClassroomDetailMembershipListComponent implements OnInit {
  memberships$!: Observable<Membership[]>;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.memberships$ = this.classroomMembershipListGql
        .watch({ id: params.get('id')! })
        .valueChanges.pipe(
          map((result) => [...result.data.classroom.memberships.results]),
          concatMap((memberships) =>
            this.auth.user$.pipe(
              map((user) =>
                memberships
                  .sort((a, b) =>
                    a.owner.id == user!.id
                      ? -1
                      : b.owner.id == user!.id
                      ? 1
                      : 0,
                  )
                  .sort((a, b) =>
                    a.role == b.role ? 0 : a.role == Role.Teacher ? -1 : 1,
                  ),
              ),
            ),
          ),
        );
    });
  }
}
