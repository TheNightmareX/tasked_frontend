import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { LayoutsModule } from '../layouts/layouts.module';
import { ProfileModule } from '../profile/profile.module';
import { ThemeModule } from '../theme/theme.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainLayoutSidenavComponent } from './main-layout-sidenav/main-layout-sidenav.component';
import { MainLayoutSidenavRoomsComponent } from './main-layout-sidenav-rooms/main-layout-sidenav-rooms.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    MainLayoutSidenavComponent,
    MainLayoutSidenavRoomsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MainRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    NgxSkeletonLoaderModule,
    LayoutsModule,
    ProfileModule,
    ThemeModule,
  ],
})
export class MainModule {}
