import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSidebarMembershipListItemComponent } from './classroom-detail-sidebar-membership-list-item.component';

describe('ClassroomDetailSidebarMembershipListItemComponent', () => {
  let component: ClassroomDetailSidebarMembershipListItemComponent;
  let fixture: ComponentFixture<ClassroomDetailSidebarMembershipListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailSidebarMembershipListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailSidebarMembershipListItemComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
