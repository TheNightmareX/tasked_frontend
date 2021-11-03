import { Component, Input, OnInit } from '@angular/core';
import { ClassroomAssignmentListQuery } from 'src/app/graphql';

type Assignment =
  ClassroomAssignmentListQuery['classroom']['assignments']['results'][number];

@Component({
  selector: 'app-classroom-detail-assignments-item-detail',
  templateUrl: './classroom-detail-assignments-item-detail.component.html',
  styleUrls: ['./classroom-detail-assignments-item-detail.component.css'],
})
export class ClassroomDetailAssignmentsItemDetailComponent implements OnInit {
  @Input()
  assignment?: Assignment;

  constructor() {}

  ngOnInit() {}
}
