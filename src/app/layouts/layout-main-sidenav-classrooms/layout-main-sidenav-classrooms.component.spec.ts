import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainSidenavClassroomsComponent } from './layout-main-sidenav-classrooms.component';

describe('LayoutMainSidenavClassroomsComponent', () => {
  let component: LayoutMainSidenavClassroomsComponent;
  let fixture: ComponentFixture<LayoutMainSidenavClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutMainSidenavClassroomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainSidenavClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
