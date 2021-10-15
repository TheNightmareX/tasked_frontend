import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailMembershipListComponent } from './classroom-detail-membership-list.component';

describe('ClassroomDetailMembershipListComponent', () => {
  let component: ClassroomDetailMembershipListComponent;
  let fixture: ComponentFixture<ClassroomDetailMembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailMembershipListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailMembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
