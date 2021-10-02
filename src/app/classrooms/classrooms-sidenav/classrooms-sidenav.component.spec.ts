import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomsSidenavComponent } from './classrooms-sidenav.component';

describe('ClassroomsSidenavComponent', () => {
  let component: ClassroomsSidenavComponent;
  let fixture: ComponentFixture<ClassroomsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomsSidenavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
