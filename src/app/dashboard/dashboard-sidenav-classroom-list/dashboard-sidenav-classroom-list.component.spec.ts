import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidenavClassroomListComponent } from './dashboard-sidenav-classroom-list.component';

describe('DashboardSidenavClassroomListComponent', () => {
  let component: DashboardSidenavClassroomListComponent;
  let fixture: ComponentFixture<DashboardSidenavClassroomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSidenavClassroomListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSidenavClassroomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
