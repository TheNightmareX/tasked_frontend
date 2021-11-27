import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutMainSidenavClassroomsComponent } from './layout-main-sidenav-classrooms/layout-main-sidenav-classrooms.component';
import { LayoutMainSidenavComponent } from './layout-main-sidenav/layout-main-sidenav.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LayoutRefetchButtonComponent } from './layout-refetch-button/layout-refetch-button.component';
import { LayoutThemeButtonComponent } from './layout-theme-button/layout-theme-button.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutAuthComponent,
    LayoutMainComponent,
    LayoutMainSidenavComponent,
    LayoutMainSidenavClassroomsComponent,
    LayoutRefetchButtonComponent,
    LayoutThemeButtonComponent,
  ],
  imports: [SharedModule, RouterModule, ProfileModule],
})
export class LayoutsModule {}
