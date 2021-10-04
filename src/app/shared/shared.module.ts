import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { EqualDirective } from './equal.directive';
import { LayoutProfileMenuComponent } from './layout-profile-menu/layout-profile-menu.component';
import { LayoutComponent } from './layout/layout.component';
import { LoadingDirective } from './loading.directive';

const modules = [CommonModule, FormsModule, FlexLayoutModule];
const components = [LayoutComponent];
const directives = [EqualDirective, LoadingDirective];

@NgModule({
  declarations: [components, directives, LayoutProfileMenuComponent],
  imports: [
    modules,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [modules, components, directives],
})
export class SharedModule {}
