import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClassroomDetailMembershipListComponent } from './classroom-detail-membership-list/classroom-detail-membership-list.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';
import { ClassroomDetailTabAssignmentsComponent } from './classroom-detail-tab-assignments/classroom-detail-tab-assignments.component';
import { ClassroomDetailTabAssignmentsListComponent } from './classroom-detail-tab-assignments-list/classroom-detail-tab-assignments-list.component';
import { ClassroomDetailTabAssignmentsListItemComponent } from './classroom-detail-tab-assignments-list-item/classroom-detail-tab-assignments-list-item.component';
import { ClassroomDetailMembershipListItemComponent } from './classroom-detail-membership-list-item/classroom-detail-membership-list-item.component';

@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomListComponent,
    ClassroomDetailComponent,
    ClassroomDetailMembershipListComponent,
    ClassroomDetailTabAssignmentsComponent,
    ClassroomDetailTabAssignmentsListComponent,
    ClassroomDetailTabAssignmentsListItemComponent,
    ClassroomDetailMembershipListItemComponent,
  ],
  imports: [SharedModule, ClassroomsRoutingModule],
})
export class ClassroomsModule {}
