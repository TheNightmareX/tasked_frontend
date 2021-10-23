import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSidebarMembershipListComponent } from './classroom-detail-sidebar-membership-list.component';

describe('ClassroomDetailSidebarMembershipListComponent', () => {
  let component: ClassroomDetailSidebarMembershipListComponent;
  let fixture: ComponentFixture<ClassroomDetailSidebarMembershipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailSidebarMembershipListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailSidebarMembershipListComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
