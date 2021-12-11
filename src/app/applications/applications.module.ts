import { NgModule } from '@angular/core';
import { MainModule } from '../main/main.module';
import { SharedModule } from '../shared/shared.module';
import { ApplicationListItemComponent } from './application-list-item/application-list-item.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';

@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationListComponent,
    ApplicationListItemComponent,
  ],
  imports: [SharedModule, MainModule, ApplicationsRoutingModule],
})
export class ApplicationsModule {}
