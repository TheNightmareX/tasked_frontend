import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  ClassroomDetailGQL,
  ClassroomMembershipListGQL,
  ClassroomMembershipListQuery,
  MembershipDeleteGQL,
  MembershipUpdateGQL,
  Role,
} from 'src/app/graphql';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];

@Component({
  selector: 'app-classroom-detail-sidebar-membership-list-item-menu',
  templateUrl:
    './classroom-detail-sidebar-membership-list-item-menu.component.html',
  styleUrls: [
    './classroom-detail-sidebar-membership-list-item-menu.component.scss',
  ],
})
export class ClassroomDetailSidebarMembershipListItemMenuComponent
  implements OnInit, OnDestroy
{
  @Input() membership?: Membership;
  loading = false;
  canPromote?: boolean;
  canDemote?: boolean;
  canRemove?: boolean;

  private classroomId!: string;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: NotifierService,
    private classroomGql: ClassroomDetailGQL,
    private listGql: ClassroomMembershipListGQL,
    private updateGql: MembershipUpdateGQL,
    private deleteGql: MembershipDeleteGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (!this.membership) return;

      this.classroomId = params.get('id')!;

      this.subscription?.unsubscribe();
      this.subscription = combineLatest([
        this.classroomGql
          .watch({ id: this.classroomId })
          .valueChanges.pipe(map((result) => result.data.classroom)),
        this.auth.user$,
      ]).subscribe(([classroom, user]) => {
        const isSelf = this.membership?.owner.id == user?.id;
        if (classroom.creator.id == user?.id) {
          this.canPromote = this.membership?.role == Role.Student;
          this.canDemote = this.membership?.role == Role.Teacher && !isSelf;
          this.canRemove = !isSelf;
        } else {
          if (classroom.membership!.role == Role.Student) {
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
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  promote() {
    this.mutate(
      (membership) =>
        this.updateGql.mutate({
          id: membership.id,
          data: { role: Role.Teacher },
        }),
      $localize`Member promoted successfully`,
      $localize`Failed to promote the member`,
    );
  }

  demote() {
    this.mutate(
      (membership) =>
        this.updateGql.mutate({
          id: membership.id,
          data: { role: Role.Student },
        }),
      $localize`Member demoted successfully`,
      $localize`Failed to demote the member`,
    );
  }

  remove() {
    this.mutate(
      (membership) =>
        this.deleteGql.mutate(
          { id: membership.id },
          {
            update: (cache) => {
              cache.evict({ id: cache.identify(membership) });
              const query = this.listGql.watch({ id: this.classroomId });
              query.updateQuery((prev) => ({
                ...prev,
                classroom: {
                  ...prev.classroom,
                  memberships: {
                    ...prev.classroom.memberships,
                    total: prev.classroom.memberships.total - 1,
                  },
                },
              }));
            },
          },
        ),
      $localize`Member removed successfully`,
      $localize`Failed to remove the member`,
    );
  }

  private mutate(
    mutation: (membership: Membership) => Observable<unknown>,
    messageSuccess: string,
    messageFail: string,
  ) {
    if (this.loading) return;
    if (this.membership)
      mutation(this.membership).subscribe(
        () => {
          this.notifier.notify(NotificationType.Success, messageSuccess);
        },
        () => {
          this.notifier.notify(NotificationType.Error, messageFail);
        },
        () => {
          this.loading = false;
        },
      );
  }
}
