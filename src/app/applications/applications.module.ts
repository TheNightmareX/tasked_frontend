import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApplicationCreationComponent } from './application-creation/application-creation.component';
import { ApplicationListItemComponent } from './application-list-item/application-list-item.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';

@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationListComponent,
    ApplicationListItemComponent,
    ApplicationCreationComponent,
  ],
  imports: [SharedModule, ApplicationsRoutingModule],
})
export class ApplicationsModule {}
