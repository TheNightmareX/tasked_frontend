import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClassroomCreationComponent } from './classroom-creation/classroom-creation.component';
import { ClassroomDetailAssignmentsItemComponent } from './classroom-detail-assignments-item/classroom-detail-assignments-item.component';
import { ClassroomDetailAssignmentsComponent } from './classroom-detail-assignments/classroom-detail-assignments.component';
import { ClassroomDetailSettingsItemComponent } from './classroom-detail-settings-item/classroom-detail-settings-item.component';
import { ClassroomDetailSettingsComponent } from './classroom-detail-settings/classroom-detail-settings.component';
import { ClassroomDetailSidebarMembershipListItemMenuComponent } from './classroom-detail-sidebar-membership-list-item-menu/classroom-detail-sidebar-membership-list-item-menu.component';
import { ClassroomDetailSidebarMembershipListItemComponent } from './classroom-detail-sidebar-membership-list-item/classroom-detail-sidebar-membership-list-item.component';
import { ClassroomDetailSidebarMembershipListComponent } from './classroom-detail-sidebar-membership-list/classroom-detail-sidebar-membership-list.component';
import { ClassroomDetailSidebarComponent } from './classroom-detail-sidebar/classroom-detail-sidebar.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomRedirectorComponent } from './classroom-redirector/classroom-redirector.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';

@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomListComponent,
    ClassroomDetailComponent,
    ClassroomDetailAssignmentsComponent,
    ClassroomDetailAssignmentsItemComponent,
    ClassroomCreationComponent,
    ClassroomDetailSidebarComponent,
    ClassroomDetailSidebarMembershipListComponent,
    ClassroomDetailSidebarMembershipListItemComponent,
    ClassroomDetailSidebarMembershipListItemMenuComponent,
    ClassroomRedirectorComponent,
    ClassroomDetailSettingsComponent,
    ClassroomDetailSettingsItemComponent,
  ],
  imports: [SharedModule, ClassroomsRoutingModule],
})
export class ClassroomsModule {}
