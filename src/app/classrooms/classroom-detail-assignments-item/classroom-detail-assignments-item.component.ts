import { Component, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import {
  AssignmentUpdateGQL,
  ClassroomAssignmentListQuery,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';

type Assignment =
  ClassroomAssignmentListQuery['classroom']['assignments']['results'][number];

@Component({
  selector: 'app-classroom-detail-assignments-item',
  templateUrl: './classroom-detail-assignments-item.component.html',
  styleUrls: ['./classroom-detail-assignments-item.component.css'],
})
export class ClassroomDetailAssignmentsItemComponent implements OnInit {
  @Input()
  assignment?: Assignment;

  completionIcon = '';
  completionTooltip = '';

  importanceIcon = '';
  importanceTooltip = '';

  private loading = false;

  constructor(
    private updateGql: AssignmentUpdateGQL,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    if (!this.assignment) return;

    this.completionIcon = this.assignment.isCompleted
      ? 'radio_button_checked'
      : 'radio_button_unchecked';
    this.completionTooltip = this.assignment.isCompleted
      ? 'Mark as pending'
      : 'Mark as completed';
    this.importanceIcon = this.assignment.isImportant ? 'star' : 'star_outline';
    this.importanceTooltip = this.assignment.isImportant
      ? 'Remove important mark'
      : 'Mark as important';
  }

  switchCompletion() {
    if (!this.assignment) return;
    this.update({ isCompleted: !this.assignment.isCompleted });
  }

  switchImportance() {
    if (!this.assignment) return;
    this.update({ isImportant: !this.assignment.isImportant });
  }

  private update(data: Data) {
    if (!this.assignment) return;
    if (this.loading) return;

    const { id, isImportant, isPublic, isCompleted } = this.assignment;

    this.loading = true;
    timer(200)
      .pipe(
        concatMap(() =>
          this.updateGql.mutate(
            {
              id: this.assignment!.id,
              data,
            },
            {
              optimisticResponse: {
                __typename: 'Mutation',
                updateAssignment: {
                  __typename: 'Assignment',
                  id,
                  isCompleted,
                  isImportant,
                  isPublic,
                  ...data,
                },
              },
            },
          ),
        ),
      )
      .subscribe({
        complete: () => {
          this.loading = false;
        },
        error: () => {
          this.notifier.notify(
            NotificationType.Error,
            'Failed to update the assignment',
          );
        },
      });
  }
}