import { NgModule } from '@angular/core';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutComponent } from './layout/layout.component';
import { MainLayoutSidenavRoomsComponent } from './main-layout-sidenav-rooms/main-layout-sidenav-rooms.component';
import { MainLayoutSidenavComponent } from './main-layout-sidenav/main-layout-sidenav.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RefetchButtonComponent } from './refetch-button/refetch-button.component';
import { ThemeButtonComponent } from './theme-button/theme-button.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    MainLayoutSidenavComponent,
    MainLayoutSidenavRoomsComponent,
    RefetchButtonComponent,
    ThemeButtonComponent,
  ],
  imports: [SharedModule, ProfileModule],
})
export class LayoutsModule {}
