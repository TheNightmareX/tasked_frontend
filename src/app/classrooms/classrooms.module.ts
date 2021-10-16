import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClassroomDetailMembershipListComponent } from './classroom-detail-membership-list/classroom-detail-membership-list.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';
import { ClassroomDetailAssignmentsComponent } from './classroom-detail-assignments/classroom-detail-assignments.component';
import { ClassroomDetailAssignmentsItemComponent } from './classroom-detail-assignments-item/classroom-detail-assignments-item.component';

@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomListComponent,
    ClassroomDetailComponent,
    ClassroomDetailMembershipListComponent,
    ClassroomDetailAssignmentsComponent,
    ClassroomDetailAssignmentsItemComponent,
  ],
  imports: [SharedModule, ClassroomsRoutingModule],
})
export class ClassroomsModule {}
