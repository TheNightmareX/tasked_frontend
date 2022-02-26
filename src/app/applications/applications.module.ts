import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfinityScrollModule } from '../infinity-scroll/infinity-scroll.module';
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
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutingModule,
    InfinityScrollModule,
  ],
})
export class ApplicationsModule {}
