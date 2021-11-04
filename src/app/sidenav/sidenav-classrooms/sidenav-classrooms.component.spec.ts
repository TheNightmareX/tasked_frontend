import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavClassroomsComponent } from './sidenav-classrooms.component';

describe('SidenavClassroomsComponent', () => {
  let component: SidenavClassroomsComponent;
  let fixture: ComponentFixture<SidenavClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavClassroomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
