import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTasksItemAssignPopupComponent } from './classroom-detail-tasks-item-assign-popup.component';

describe('ClassroomDetailTasksItemAssignPopupComponent', () => {
  let component: ClassroomDetailTasksItemAssignPopupComponent;
  let fixture: ComponentFixture<ClassroomDetailTasksItemAssignPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTasksItemAssignPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailTasksItemAssignPopupComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
