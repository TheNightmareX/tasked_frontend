import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardSidenavClassroomListComponent } from './dashboard-sidenav-classroom-list/dashboard-sidenav-classroom-list.component';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSidenavComponent,
    DashboardSidenavClassroomListComponent,
  ],
  imports: [SharedModule, DashboardRoutingModule, MatListModule, MatIconModule],
})
export class DashboardModule {}
