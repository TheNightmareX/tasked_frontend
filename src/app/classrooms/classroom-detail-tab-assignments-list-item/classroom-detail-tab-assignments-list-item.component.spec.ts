import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTabAssignmentsListItemComponent } from './classroom-detail-tab-assignments-list-item.component';

describe('ClassroomDetailTabAssignmentsListItemComponent', () => {
  let component: ClassroomDetailTabAssignmentsListItemComponent;
  let fixture: ComponentFixture<ClassroomDetailTabAssignmentsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTabAssignmentsListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailTabAssignmentsListItemComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
