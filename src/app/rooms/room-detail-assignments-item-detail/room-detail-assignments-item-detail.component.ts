import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RoomAssignmentListQuery } from 'src/app/graphql';

type Assignment =
  RoomAssignmentListQuery['room']['assignments']['results'][number];

@Component({
  selector: 'app-room-detail-assignments-item-detail',
  templateUrl: './room-detail-assignments-item-detail.component.html',
  styleUrls: ['./room-detail-assignments-item-detail.component.scss'],
  viewProviders: [DatePipe],
})
export class RoomDetailAssignmentsItemDetailComponent implements OnInit {
  @Input() assignment?: Assignment;

  infoItems: Info[] = [];

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    // TODO: use <app-username>
    this.infoItems = [
      {
        name: $localize`Creator`,
        value: this.assignment
          ? this.assignment.task.creator.nickname ??
            this.assignment.task.creator.username
          : '',
        icon: 'person',
      },
      {
        name: $localize`Creation Time`,
        value: this.assignment
          ? this.datePipe.transform(this.assignment.createdAt, 'medium')!
          : '',
        icon: 'calendar_today',
      },
    ];
  }
}

interface Info {
  name: string;
  value: string;
  icon: string;
}