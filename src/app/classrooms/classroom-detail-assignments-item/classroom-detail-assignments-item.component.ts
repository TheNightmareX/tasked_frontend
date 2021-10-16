import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import {
  AssignmentUpdateGQL,
  AssignmentUpdateInput,
  ClassroomAssignmentListQuery,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';

type Assignment =
  ClassroomAssignmentListQuery['classroom']['assignments']['results'][number];

type Data = {
  [Key in keyof AssignmentUpdateInput]: NonNullable<AssignmentUpdateInput[Key]>;
};

@Component({
  selector: 'app-classroom-detail-assignments-item',
  templateUrl: './classroom-detail-assignments-item.component.html',
  styleUrls: ['./classroom-detail-assignments-item.component.css'],
})
export class ClassroomDetailAssignmentsItemComponent implements OnInit {
  @Input()
  assignment!: Assignment;

  completionIcon!: string;
  completionTooltip!: string;

  importanceIcon!: string;
  importanceTooltip!: string;

  private loading = false;

  constructor(
    private updateGql: AssignmentUpdateGQL,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
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
    this.update({ isCompleted: !this.assignment.isCompleted });
  }

  switchImportance() {
    this.update({ isImportant: !this.assignment.isImportant });
  }

  private update(data: Data) {
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
