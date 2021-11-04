import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';

@NgModule({
  declarations: [ApplicationsComponent],
  imports: [SharedModule, ApplicationsRoutingModule, SidenavModule],
})
export class ApplicationsModule {}
