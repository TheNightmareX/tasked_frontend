import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Role,
  Gender,
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
} from 'src/app/graphql';
import { ClassroomsStateService } from '../classrooms-state.service';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];
type Classroom = ClassroomMembershipListQuery['classroom'];

@Component({
  selector: 'app-classroom-detail-membership-list',
  templateUrl: './classroom-detail-membership-list.component.html',
  styleUrls: ['./classroom-detail-membership-list.component.css'],
})
export class ClassroomDetailMembershipListComponent implements OnInit {
  classroom$: Observable<Classroom>;
  memberships$: Observable<Membership[]>;

  Role = Role;
  Gender = Gender;

  private query;

  constructor(
    private state: ClassroomsStateService,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
  ) {
    this.query = this.classroomMembershipListGql.watch({
      id: this.state.activeId!,
    });
    this.classroom$ = this.query.valueChanges.pipe(
      map(({ data }) => data.classroom),
    );
    this.memberships$ = this.classroom$.pipe(
      map((classroom) => classroom.memberships.results),
      map((memberships) => [...memberships].sort(this.membershipComparer)),
    );
  }

  ngOnInit() {}

  getDisplayName(membership: Membership) {
    return (
      membership.displayName ??
      membership.owner.nickname ??
      membership.owner.username
    );
  }

  private membershipComparer = (
    membershipA: Membership,
    membershipB: Membership,
  ) =>
    membershipA.role == membershipB.role
      ? 0
      : membershipA.role == Role.Teacher
      ? -1
      : 1;
}
