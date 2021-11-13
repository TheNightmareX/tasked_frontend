import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTasksItemComponent } from './classroom-detail-tasks-item.component';

describe('ClassroomDetailTasksItemComponent', () => {
  let component: ClassroomDetailTasksItemComponent;
  let fixture: ComponentFixture<ClassroomDetailTasksItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTasksItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailTasksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
