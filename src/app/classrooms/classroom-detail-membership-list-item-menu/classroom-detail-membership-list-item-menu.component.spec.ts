import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailMembershipListItemMenuComponent } from './classroom-detail-membership-list-item-menu.component';

describe('ClassroomDetailMembershipListItemMenuComponent', () => {
  let component: ClassroomDetailMembershipListItemMenuComponent;
  let fixture: ComponentFixture<ClassroomDetailMembershipListItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailMembershipListItemMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailMembershipListItemMenuComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
