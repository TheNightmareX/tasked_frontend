import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRefetchButtonComponent } from './layout-refetch-button.component';

describe('LayoutRefetchButtonComponent', () => {
  let component: LayoutRefetchButtonComponent;
  let fixture: ComponentFixture<LayoutRefetchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutRefetchButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutRefetchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
