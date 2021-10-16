import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClassroomDetailMembershipListComponent } from './classroom-detail-membership-list/classroom-detail-membership-list.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';

@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomListComponent,
    ClassroomDetailComponent,
    ClassroomDetailMembershipListComponent,
  ],
  imports: [SharedModule, ClassroomsRoutingModule],
})
export class ClassroomsModule {}
