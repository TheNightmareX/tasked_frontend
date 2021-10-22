import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassroomDetailGQL,
  ClassroomDetailQuery,
  ClassroomMembershipListQuery,
  Gender,
  Role,
} from 'src/app/graphql';
import { ClassroomsStateService } from '../classrooms-state.service';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];
type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail-membership-list-item',
  templateUrl: './classroom-detail-membership-list-item.component.html',
  styleUrls: ['./classroom-detail-membership-list-item.component.css'],
})
export class ClassroomDetailMembershipListItemComponent implements OnInit {
  @Input()
  membership!: Membership;

  name!: string;
  icon!: string;
  color$!: Observable<string | null>;
  class!: string[];

  constructor(
    private state: ClassroomsStateService,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    const classroom$ = this.classroomGql
      .watch({ id: this.state.activeId! })
      .valueChanges.pipe(map(({ data }) => data.classroom));

    this.name =
      this.membership.displayName ??
      this.membership.owner.nickname ??
      this.membership.owner.username;

    this.icon =
      this.membership.role == Role.Student ? 'person' : 'manage_accounts';

    this.color$ = classroom$.pipe(
      map((classroom) =>
        this.membership.owner.id == classroom.creator?.id ? 'accent' : null,
      ),
    );

    this.class =
      this.membership.owner.gender == Gender.Male
        ? ['text--blue']
        : this.membership.owner.gender == Gender.Female
        ? ['text--pink']
        : [];
  }
}
