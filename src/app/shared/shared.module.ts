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
import { LayoutProfileDialogEditComponent } from './layout-profile-dialog-edit/layout-profile-dialog-edit.component';
import { LayoutProfileMenuComponent } from './layout-profile-menu/layout-profile-menu.component';
import { LayoutComponent } from './layout/layout.component';
import { LoadingDirective } from './loading.directive';

const modules = [CommonModule, FormsModule, FlexLayoutModule];
const components = [LayoutComponent, FormProfileComponent];
const directives = [EqualDirective, LoadingDirective];

@NgModule({
  declarations: [
    components,
    directives,
    LayoutProfileMenuComponent,
    LayoutProfileDialogEditComponent,
  ],
  imports: [
    modules,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [modules, components, directives],
})
export class SharedModule {}
