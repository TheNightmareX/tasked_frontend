import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProfileMenuComponent } from './layout-profile-menu.component';

describe('LayoutProfileMenuComponent', () => {
  let component: LayoutProfileMenuComponent;
  let fixture: ComponentFixture<LayoutProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutProfileMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
