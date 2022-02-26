import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from '../modal/modal.module';
import { ProfileBtnMenuComponent } from '../profile/profile-btn-menu/profile-btn-menu.component';
import { ProfileBtnComponent } from '../profile/profile-btn/profile-btn.component';
import { ProfileFormComponent } from '../profile/profile-form/profile-form.component';
import { SharedModule } from '../shared/shared.module';
import { ThemeModule } from '../theme/theme.module';
import { ProfileBtnMenuEditPopupComponent } from './profile-btn-menu-edit-popup/profile-btn-menu-edit-popup.component';

@NgModule({
  declarations: [
    ProfileBtnComponent,
    ProfileBtnMenuComponent,
    ProfileBtnMenuEditPopupComponent,
    ProfileFormComponent,
  ],
  imports: [CommonModule, SharedModule, ThemeModule, ModalModule],
  exports: [
    ProfileBtnComponent,
    ProfileBtnMenuComponent,
    ProfileBtnMenuEditPopupComponent,
    ProfileFormComponent,
  ],
})
export class ProfileModule {}
