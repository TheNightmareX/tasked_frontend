import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/common/notification-type.enum';
import {
  RoomDetailGQL,
  RoomMembershipListGQL,
  RoomMembershipListQuery,
  MembershipDeleteGQL,
  MembershipUpdateGQL,
  Role,
} from 'src/app/graphql';

type Membership =
  RoomMembershipListQuery['room']['memberships']['results'][number];

@Component({
  selector: 'app-room-detail-sidebar-membership-list-item-menu',
  templateUrl: './room-detail-sidebar-membership-list-item-menu.component.html',
  styleUrls: ['./room-detail-sidebar-membership-list-item-menu.component.scss'],
})
export class RoomDetailSidebarMembershipListItemMenuComponent
  implements OnInit, OnDestroy
{
  @Input() membership?: Membership;
  loading = false;
  canPromote?: boolean;
  canDemote?: boolean;
  canRemove?: boolean;

  private roomId!: string;
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private notifier: NotifierService,
    private roomGql: RoomDetailGQL,
    private listGql: RoomMembershipListGQL,
    private updateGql: MembershipUpdateGQL,
    private deleteGql: MembershipDeleteGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (!this.membership) return;

      this.roomId = params.get('id')!;

      this.subscription?.unsubscribe();
      this.subscription = combineLatest([
        this.roomGql
          .watch({ id: this.roomId })
          .valueChanges.pipe(map((result) => result.data.room)),
        this.auth.user$,
      ]).subscribe(([room, user]) => {
        const isSelf = this.membership?.owner.id == user?.id;
        if (room.creator.id == user?.id) {
          this.canPromote = this.membership?.role == Role.Member;
          this.canDemote = this.membership?.role == Role.Manager && !isSelf;
          this.canRemove = !isSelf;
        } else {
          if (room.membership!.role == Role.Member) {
            this.canPromote = false;
            this.canDemote = false;
            this.canRemove = false;
          } else {
            this.canPromote = this.membership?.role == Role.Member;
            this.canDemote = false;
            this.canRemove = this.membership?.role == Role.Member && !isSelf;
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
          data: { role: Role.Manager },
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
          data: { role: Role.Member },
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
              const query = this.listGql.watch({ id: this.roomId });
              query.updateQuery((prev) => ({
                ...prev,
                room: {
                  ...prev.room,
                  memberships: {
                    ...prev.room.memberships,
                    total: prev.room.memberships.total - 1,
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
