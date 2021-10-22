import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  Role,
} from 'src/app/graphql';
import { ClassroomsStateService } from '../classrooms-state.service';

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
    private state: ClassroomsStateService,
    private classroomMembershipListGql: ClassroomMembershipListGQL,
  ) {}

  ngOnInit() {
    this.memberships$ = this.classroomMembershipListGql
      .watch({
        id: this.state.activeId!,
      })
      .valueChanges.pipe(
        map((result) => [...result.data.classroom.memberships.results]),
        map((memberships) =>
          memberships.sort((a, b) =>
            a.role == b.role ? 0 : a.role == Role.Teacher ? -1 : 1,
          ),
        ),
      );
  }
}
