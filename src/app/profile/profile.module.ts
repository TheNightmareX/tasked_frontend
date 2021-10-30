import { NgModule } from '@angular/core';
import { ProfileBtnMenuComponent } from '../profile/profile-btn-menu/profile-btn-menu.component';
import { ProfileBtnComponent } from '../profile/profile-btn/profile-btn.component';
import { ProfileFormComponent } from '../profile/profile-form/profile-form.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileBtnMenuEditPopupComponent } from './profile-btn-menu-edit-popup/profile-btn-menu-edit-popup.component';

@NgModule({
  declarations: [
    ProfileBtnMenuComponent,
    ProfileBtnComponent,
    ProfileFormComponent,
    ProfileBtnMenuEditPopupComponent,
  ],
  imports: [SharedModule],
  exports: [ProfileBtnComponent],
})
export class ProfileModule {}
