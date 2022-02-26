import { NgModule } from '@angular/core';
import { LayoutsModule } from '../layouts/layouts.module';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { ThemeModule } from '../theme/theme.module';
import { MainLayoutSidenavRoomsComponent } from './main-layout-sidenav-rooms/main-layout-sidenav-rooms.component';
import { MainLayoutSidenavComponent } from './main-layout-sidenav/main-layout-sidenav.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    MainLayoutSidenavComponent,
    MainLayoutSidenavRoomsComponent,
  ],
  imports: [
    SharedModule,
    LayoutsModule,
    ProfileModule,
    ThemeModule,
    MainRoutingModule,
  ],
})
export class MainModule {}
