import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTasksComponent } from './classroom-detail-tasks.component';

describe('ClassroomDetailTasksComponent', () => {
  let component: ClassroomDetailTasksComponent;
  let fixture: ComponentFixture<ClassroomDetailTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
