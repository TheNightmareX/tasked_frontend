import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutThemeButtonComponent } from './layout-theme-button.component';

describe('LayoutThemeButtonComponent', () => {
  let component: LayoutThemeButtonComponent;
  let fixture: ComponentFixture<LayoutThemeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutThemeButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutThemeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
