import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailAssignmentsComponent } from './classroom-detail-assignments.component';

describe('ClassroomDetailAssignmentsComponent', () => {
  let component: ClassroomDetailAssignmentsComponent;
  let fixture: ComponentFixture<ClassroomDetailAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailAssignmentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
