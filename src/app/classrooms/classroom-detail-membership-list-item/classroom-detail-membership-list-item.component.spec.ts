import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailMembershipListItemComponent } from './classroom-detail-membership-list-item.component';

describe('ClassroomDetailMembershipListItemComponent', () => {
  let component: ClassroomDetailMembershipListItemComponent;
  let fixture: ComponentFixture<ClassroomDetailMembershipListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailMembershipListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ClassroomDetailMembershipListItemComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
