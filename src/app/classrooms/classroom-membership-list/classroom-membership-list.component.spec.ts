import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomMembershipListComponent } from './classroom-membership-list.component';

describe('ClassroomMembershipListComponent', () => {
  let component: ClassroomMembershipListComponent;
  let fixture: ComponentFixture<ClassroomMembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomMembershipListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomMembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
