import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { EqualDirective } from './equal.directive';
import { FormProfileComponent } from './form-profile/form-profile.component';
import { LayoutComponent } from './layout/layout.component';
import { LoadingDirective } from './loading.directive';
import { ProfileBtnComponent } from './profile-btn/profile-btn.component';
import { ProfileBtnMenuComponent } from './profile-btn-menu/profile-btn-menu.component';
import { ProfileBtnMenuDialogEditComponent } from './profile-btn-menu-dialog-edit/profile-btn-menu-dialog-edit.component';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

const modules = [
  CommonModule,
  FormsModule,
  FlexLayoutModule,
  [
    MatRippleModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTabsModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
];
const components = [
  LayoutComponent,
  FormProfileComponent,
  ProfileBtnComponent,
  ProfileBtnMenuComponent,
  ProfileBtnMenuDialogEditComponent,
];
const directives = [EqualDirective, LoadingDirective];

@NgModule({
  declarations: [components, directives],
  imports: [modules, RouterModule],
  exports: [modules, components, directives],
})
export class SharedModule {}
