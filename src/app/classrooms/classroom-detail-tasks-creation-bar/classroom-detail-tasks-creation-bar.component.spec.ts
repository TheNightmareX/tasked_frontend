import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTasksCreationBarComponent } from './classroom-detail-tasks-creation-bar.component';

describe('ClassroomDetailTasksCreationBarComponent', () => {
  let component: ClassroomDetailTasksCreationBarComponent;
  let fixture: ComponentFixture<ClassroomDetailTasksCreationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTasksCreationBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailTasksCreationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
