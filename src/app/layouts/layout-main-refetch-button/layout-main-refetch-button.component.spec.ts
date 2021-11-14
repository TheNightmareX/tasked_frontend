import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainRefetchButtonComponent } from './layout-main-refetch-button.component';

describe('LayoutMainRefetchButtonComponent', () => {
  let component: LayoutMainRefetchButtonComponent;
  let fixture: ComponentFixture<LayoutMainRefetchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutMainRefetchButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainRefetchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
