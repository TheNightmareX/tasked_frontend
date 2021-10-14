import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProfileDialogEditComponent } from './layout-profile-dialog-edit.component';

describe('LayoutProfileDialogEditComponent', () => {
  let component: LayoutProfileDialogEditComponent;
  let fixture: ComponentFixture<LayoutProfileDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutProfileDialogEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutProfileDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
