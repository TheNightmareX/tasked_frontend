import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTabAssignmentsListComponent } from './classroom-detail-tab-assignments-list.component';

describe('ClassroomDetailTabAssignmentsListComponent', () => {
  let component: ClassroomDetailTabAssignmentsListComponent;
  let fixture: ComponentFixture<ClassroomDetailTabAssignmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTabAssignmentsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailTabAssignmentsListComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
