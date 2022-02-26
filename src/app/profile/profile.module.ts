import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ModalModule } from '../modal/modal.module';
import { ProfileBtnMenuComponent } from '../profile/profile-btn-menu/profile-btn-menu.component';
import { ProfileBtnComponent } from '../profile/profile-btn/profile-btn.component';
import { ProfileFormComponent } from '../profile/profile-form/profile-form.component';
import { ThemeModule } from '../theme/theme.module';
import { UsernameModule } from '../username/username.module';
import { ValidationModule } from '../validation/validation.module';
import { ProfileBtnMenuEditPopupComponent } from './profile-btn-menu-edit-popup/profile-btn-menu-edit-popup.component';

@NgModule({
  declarations: [
    ProfileBtnComponent,
    ProfileBtnMenuComponent,
    ProfileBtnMenuEditPopupComponent,
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RouterModule,
    MatOptionModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    ValidationModule,
    UsernameModule,
    ThemeModule,
    ModalModule,
  ],
  exports: [
    ProfileBtnComponent,
    ProfileBtnMenuComponent,
    ProfileBtnMenuEditPopupComponent,
    ProfileFormComponent,
  ],
})
export class ProfileModule {}
