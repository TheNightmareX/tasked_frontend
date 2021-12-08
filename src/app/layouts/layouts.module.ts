import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutMainSidenavRoomsComponent } from './layout-main-sidenav-rooms/layout-main-sidenav-rooms.component';
import { LayoutMainSidenavComponent } from './layout-main-sidenav/layout-main-sidenav.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LayoutRefetchButtonComponent } from './layout-refetch-button/layout-refetch-button.component';
import { LayoutThemeButtonComponent } from './layout-theme-button/layout-theme-button.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    LayoutAuthComponent,
    LayoutMainComponent,
    LayoutMainSidenavComponent,
    LayoutMainSidenavRoomsComponent,
    LayoutRefetchButtonComponent,
    LayoutThemeButtonComponent,
  ],
  imports: [SharedModule, RouterModule, ProfileModule],
})
export class LayoutsModule {}
