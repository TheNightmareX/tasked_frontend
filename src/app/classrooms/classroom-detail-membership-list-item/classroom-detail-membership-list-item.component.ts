import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    private route: ActivatedRoute,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const classroom$ = this.classroomGql
        .watch({ id: params.get('id')! })
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
    });
  }
}
