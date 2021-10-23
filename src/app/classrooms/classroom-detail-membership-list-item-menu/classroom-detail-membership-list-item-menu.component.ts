import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  ClassroomDetailGQL,
  ClassroomMembershipListQuery,
  Role,
} from 'src/app/graphql';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];

@Component({
  selector: 'app-classroom-detail-membership-list-item-menu',
  templateUrl: './classroom-detail-membership-list-item-menu.component.html',
  styleUrls: ['./classroom-detail-membership-list-item-menu.component.css'],
})
export class ClassroomDetailMembershipListItemMenuComponent
  implements OnInit, OnDestroy
{
  @Input()
  membership?: Membership;

  canPromote?: boolean;
  canDemote?: boolean;
  canRemove?: boolean;

  loading: boolean = false;

  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (this.membership) {
        this.sub = combineLatest([
          this.classroomGql
            .watch({ id: params.get('id')! })
            .valueChanges.pipe(map((result) => result.data.classroom)),
          this.auth.user$,
        ]).subscribe(([classroom, user]) => {
          const isSelf = this.membership?.owner.id == user?.id;
          if (classroom.creator.id == user?.id) {
            this.canPromote = this.membership?.role == Role.Student;
            this.canDemote = this.membership?.role == Role.Teacher && !isSelf;
            this.canRemove = !isSelf;
          } else {
            if (classroom.membership.role == Role.Student) {
              this.canPromote = false;
              this.canDemote = false;
              this.canRemove = false;
            } else {
              this.canPromote = this.membership?.role == Role.Student;
              this.canDemote = false;
              this.canRemove = this.membership?.role == Role.Student && !isSelf;
            }
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  promote() {}

  demote() {}

  remove() {}
}
