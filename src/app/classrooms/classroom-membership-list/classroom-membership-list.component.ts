import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomsStateService } from 'src/app/classrooms/classrooms-state.service';
import {
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  Gender,
  Role,
} from 'src/app/graphql';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];

type Classroom = ClassroomMembershipListQuery['classroom'];

@Component({
  selector: 'app-classroom-membership-list',
  templateUrl: './classroom-membership-list.component.html',
  styleUrls: ['./classroom-membership-list.component.css'],
})
export class ClassroomMembershipListComponent implements OnInit {
  classroom$: Observable<Classroom> = of();
  memberships$: Observable<Membership[]> = of();
  Role = Role;
  Gender = Gender;

  constructor(
    private state: ClassroomsStateService,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
  ) {}

  ngOnInit() {
    this.classroom$ = this.classroomMembershipListGql
      .fetch({ id: this.state.activeId! + '' })
      .pipe(map(({ data }) => data.classroom));
    this.memberships$ = this.classroom$.pipe(
      map((classroom) => classroom.memberships.results),
      map((memberships) => [...memberships].sort(this.membershipComparer)),
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
