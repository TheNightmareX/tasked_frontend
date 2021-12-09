import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { MainLayoutSidenavRoomsComponent } from './main-layout-sidenav-rooms/main-layout-sidenav-rooms.component';
import { MainLayoutSidenavComponent } from './main-layout-sidenav/main-layout-sidenav.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LayoutRefetchButtonComponent } from './layout-refetch-button/layout-refetch-button.component';
import { LayoutThemeButtonComponent } from './layout-theme-button/layout-theme-button.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    MainLayoutSidenavComponent,
    MainLayoutSidenavRoomsComponent,
    LayoutRefetchButtonComponent,
    LayoutThemeButtonComponent,
  ],
  imports: [SharedModule, RouterModule, ProfileModule],
})
export class LayoutsModule {}
