import { NgModule } from '@angular/core';
import { ProfileBtnMenuDialogEditComponent } from '../profile/profile-btn-menu-dialog-edit/profile-btn-menu-dialog-edit.component';
import { ProfileBtnMenuComponent } from '../profile/profile-btn-menu/profile-btn-menu.component';
import { ProfileBtnComponent } from '../profile/profile-btn/profile-btn.component';
import { ProfileFormComponent } from '../profile/profile-form/profile-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileBtnMenuDialogEditComponent,
    ProfileBtnMenuComponent,
    ProfileBtnComponent,
    ProfileFormComponent,
  ],
  imports: [SharedModule],
  exports: [ProfileBtnComponent],
})
export class ProfileModule {}
