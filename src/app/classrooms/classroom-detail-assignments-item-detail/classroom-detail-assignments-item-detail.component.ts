import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ClassroomAssignmentListQuery } from 'src/app/graphql';

type Assignment =
  ClassroomAssignmentListQuery['classroom']['assignments']['results'][number];

@Component({
  selector: 'app-classroom-detail-assignments-item-detail',
  templateUrl: './classroom-detail-assignments-item-detail.component.html',
  styleUrls: ['./classroom-detail-assignments-item-detail.component.css'],
  viewProviders: [DatePipe],
})
export class ClassroomDetailAssignmentsItemDetailComponent implements OnInit {
  @Input() assignment?: Assignment;

  infoItems: Info[] = [];

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    // TODO: use <app-username>
    this.infoItems = [
      {
        name: 'Creator',
        value: this.assignment
          ? this.assignment.task.creator.nickname ??
            this.assignment.task.creator.username
          : '',
        icon: 'person',
      },
      {
        name: 'Creation Time',
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
