import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDetailGQL, Role } from 'src/app/graphql';

@Component({
  selector: 'app-room-detail-tab-redirector',
  templateUrl: './room-detail-tab-redirector.component.html',
  styleUrls: ['./room-detail-tab-redirector.component.scss'],
})
export class RoomDetailTabRedirectorComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomGql: RoomDetailGQL,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.roomGql.fetch({ id }).subscribe((result) => {
      this.router.navigate(
        [
          '/rooms',
          id,
          result.data.room.membership!.role == Role.Member
            ? 'assignments'
            : 'tasks',
        ],
        { replaceUrl: true },
      );
    });
  }
}
