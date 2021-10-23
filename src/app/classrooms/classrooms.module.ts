import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClassroomCreationComponent } from './classroom-creation/classroom-creation.component';
import { ClassroomDetailSidebarMembershipListItemMenuComponent } from './classroom-detail-sidebar-membership-list-item-menu/classroom-detail-sidebar-membership-list-item-menu.component';
import { ClassroomDetailSidebarMembershipListItemComponent } from './classroom-detail-sidebar-membership-list-item/classroom-detail-sidebar-membership-list-item.component';
import { ClassroomDetailSidebarMembershipListComponent } from './classroom-detail-sidebar-membership-list/classroom-detail-sidebar-membership-list.component';
import { ClassroomDetailSidebarComponent } from './classroom-detail-sidebar/classroom-detail-sidebar.component';
import { ClassroomDetailTabAssignmentsListItemComponent } from './classroom-detail-tab-assignments-list-item/classroom-detail-tab-assignments-list-item.component';
import { ClassroomDetailTabAssignmentsListComponent } from './classroom-detail-tab-assignments-list/classroom-detail-tab-assignments-list.component';
import { ClassroomDetailTabAssignmentsComponent } from './classroom-detail-tab-assignments/classroom-detail-tab-assignments.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';

@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomListComponent,
    ClassroomDetailComponent,
    ClassroomDetailTabAssignmentsComponent,
    ClassroomDetailTabAssignmentsListComponent,
    ClassroomDetailTabAssignmentsListItemComponent,
    ClassroomCreationComponent,
    ClassroomDetailSidebarComponent,
    ClassroomDetailSidebarMembershipListComponent,
    ClassroomDetailSidebarMembershipListItemComponent,
    ClassroomDetailSidebarMembershipListItemMenuComponent,
  ],
  imports: [SharedModule, ClassroomsRoutingModule],
})
export class ClassroomsModule {}
