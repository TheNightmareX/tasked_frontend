import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  Gender,
  Role,
} from 'src/app/graphql';
import { ClassroomsStateService } from '../classrooms-state.service';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];
type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail-membership-list',
  templateUrl: './classroom-detail-membership-list.component.html',
  styleUrls: ['./classroom-detail-membership-list.component.css'],
})
export class ClassroomDetailMembershipListComponent implements OnInit {
  classroom$!: Observable<Classroom>;
  memberships$!: Observable<Membership[]>;

  Role = Role;
  Gender = Gender;

  constructor(
    private state: ClassroomsStateService,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.classroom$ = this.classroomGql
      .watch({ id: this.state.activeId! })
      .valueChanges.pipe(map(({ data }) => data.classroom));
    this.memberships$ = this.classroomMembershipListGql
      .watch({
        id: this.state.activeId!,
      })
      .valueChanges.pipe(
        map(({ data }) =>
          [...data.classroom.memberships.results].sort(this.membershipComparer),
        ),
      );
  }

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
