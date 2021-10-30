import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBtnMenuDialogEditComponent } from './profile-btn-menu-dialog-edit.component';

describe('ProfileBtnMenuDialogEditComponent', () => {
  let component: ProfileBtnMenuDialogEditComponent;
  let fixture: ComponentFixture<ProfileBtnMenuDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileBtnMenuDialogEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBtnMenuDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
