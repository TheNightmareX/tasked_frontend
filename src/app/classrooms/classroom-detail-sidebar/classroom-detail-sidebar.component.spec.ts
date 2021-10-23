import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSidebarComponent } from './classroom-detail-sidebar.component';

describe('ClassroomDetailSidebarComponent', () => {
  let component: ClassroomDetailSidebarComponent;
  let fixture: ComponentFixture<ClassroomDetailSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
