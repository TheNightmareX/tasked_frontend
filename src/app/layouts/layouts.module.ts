import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutMainSidenavComponent } from './layout-main-sidenav/layout-main-sidenav.component';
import { LayoutMainSidenavClassroomsComponent } from './layout-main-sidenav-classrooms/layout-main-sidenav-classrooms.component';

@NgModule({
  declarations: [LayoutComponent, LayoutAuthComponent, LayoutMainComponent, LayoutMainSidenavComponent, LayoutMainSidenavClassroomsComponent],
  imports: [SharedModule, RouterModule, ProfileModule],
})
export class LayoutsModule {}
