import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ApplicationListItemComponent } from './application-list-item/application-list-item.component';

@NgModule({
  declarations: [ApplicationsComponent, ApplicationListComponent, ApplicationListItemComponent],
  imports: [SharedModule, ApplicationsRoutingModule],
})
export class ApplicationsModule {}
