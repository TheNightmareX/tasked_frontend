import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSidebarMembershipListItemMenuComponent } from './classroom-detail-sidebar-membership-list-item-menu.component';

describe('ClassroomDetailSidebarMembershipListItemMenuComponent', () => {
  let component: ClassroomDetailSidebarMembershipListItemMenuComponent;
  let fixture: ComponentFixture<ClassroomDetailSidebarMembershipListItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailSidebarMembershipListItemMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailSidebarMembershipListItemMenuComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
