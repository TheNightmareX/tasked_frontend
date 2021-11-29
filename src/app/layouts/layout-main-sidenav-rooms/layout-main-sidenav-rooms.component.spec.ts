import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainSidenavRoomsComponent } from './layout-main-sidenav-rooms.component';

describe('LayoutMainSidenavRoomsComponent', () => {
  let component: LayoutMainSidenavRoomsComponent;
  let fixture: ComponentFixture<LayoutMainSidenavRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutMainSidenavRoomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainSidenavRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
