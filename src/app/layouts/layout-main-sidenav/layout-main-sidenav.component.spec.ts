import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainSidenavComponent } from './layout-main-sidenav.component';

describe('LayoutMainSidenavComponent', () => {
  let component: LayoutMainSidenavComponent;
  let fixture: ComponentFixture<LayoutMainSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutMainSidenavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
