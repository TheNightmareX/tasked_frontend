import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailAssignmentsItemDetailComponent } from './classroom-detail-assignments-item-detail.component';

describe('ClassroomDetailAssignmentsItemDetailComponent', () => {
  let component: ClassroomDetailAssignmentsItemDetailComponent;
  let fixture: ComponentFixture<ClassroomDetailAssignmentsItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomDetailAssignmentsItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailAssignmentsItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
