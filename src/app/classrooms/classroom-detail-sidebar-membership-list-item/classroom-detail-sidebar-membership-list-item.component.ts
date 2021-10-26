import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  ClassroomDetailGQL,
  ClassroomMembershipListQuery,
  Gender,
  Role,
} from 'src/app/graphql';

type Membership =
  ClassroomMembershipListQuery['classroom']['memberships']['results'][number];

@Component({
  selector: 'app-classroom-detail-sidebar-membership-list-item',
  templateUrl: './classroom-detail-sidebar-membership-list-item.component.html',
  styleUrls: ['./classroom-detail-sidebar-membership-list-item.component.css'],
})
export class ClassroomDetailSidebarMembershipListItemComponent
  implements OnInit
{
  @Input()
  membership?: Membership;

  name?: string;
  icon?: string;
  iconColor?: string | null;
  titleClassList?: string[];

  @ViewChild(MatMenuTrigger)
  private menuTrigger?: MatMenuTrigger;

  constructor(
    private route: ActivatedRoute,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.classroomGql
        .watch({ id: params.get('id')! })
        .valueChanges.pipe(map(({ data }) => data.classroom))
        .subscribe((classroom) => {
          if (!this.membership) return;

          this.name =
            this.membership.displayName ??
            this.membership.owner.nickname ??
            this.membership.owner.username;

          this.icon =
            this.membership.role == Role.Student ? 'person' : 'manage_accounts';

          this.iconColor =
            this.membership.owner.id == classroom.creator?.id ? 'accent' : null;

          this.titleClassList =
            this.membership.owner.gender == Gender.Male
              ? ['text--blue']
              : this.membership.owner.gender == Gender.Female
              ? ['text--pink']
              : [];
        });
    });
  }

  /**
   * Open a menu exactly on where the user clicks.
   *
   * Inspired by https://stackoverflow.com/questions/47527529/how-to-change-absolute-position-of-mat-menu-in-angular-4-material-using-x-and-y
   *
   * @param event
   * @param item
   * @param helper
   */
  openMenu(event: MouseEvent, item: HTMLElement, helper: HTMLElement) {
    const { left: itemX, top: itemY } = item.getBoundingClientRect();
    const { clientX, clientY } = event;
    const left = clientX - itemX;
    const top = clientY - itemY;
    helper.style.left = `${left}px`;
    helper.style.top = `${top}px`;
    this.menuTrigger?.openMenu();
  }
}
