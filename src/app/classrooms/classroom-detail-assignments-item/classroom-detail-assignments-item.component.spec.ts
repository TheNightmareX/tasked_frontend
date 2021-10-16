import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailAssignmentsItemComponent } from './classroom-detail-assignments-item.component';

describe('ClassroomDetailAssignmentsItemComponent', () => {
  let component: ClassroomDetailAssignmentsItemComponent;
  let fixture: ComponentFixture<ClassroomDetailAssignmentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailAssignmentsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailAssignmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
