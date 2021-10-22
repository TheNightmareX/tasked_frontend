import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTabAssignmentsComponent } from './classroom-detail-tab-assignments.component';

describe('ClassroomDetailTabAssignmentsComponent', () => {
  let component: ClassroomDetailTabAssignmentsComponent;
  let fixture: ComponentFixture<ClassroomDetailTabAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTabAssignmentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailTabAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
