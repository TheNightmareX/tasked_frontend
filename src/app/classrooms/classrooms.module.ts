import { NgModule } from '@angular/core';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { ClassroomCreationComponent } from './classroom-creation/classroom-creation.component';
import { ClassroomDetailAssignmentsItemDetailComponent } from './classroom-detail-assignments-item-detail/classroom-detail-assignments-item-detail.component';
import { ClassroomDetailAssignmentsItemComponent } from './classroom-detail-assignments-item/classroom-detail-assignments-item.component';
import { ClassroomDetailAssignmentsComponent } from './classroom-detail-assignments/classroom-detail-assignments.component';
import { ClassroomDetailSettingsSectionComponent } from './classroom-detail-settings-section/classroom-detail-settings-section.component';
import { ClassroomDetailSettingsComponent } from './classroom-detail-settings/classroom-detail-settings.component';
import { ClassroomDetailSidebarMembershipListItemMenuComponent } from './classroom-detail-sidebar-membership-list-item-menu/classroom-detail-sidebar-membership-list-item-menu.component';
import { ClassroomDetailSidebarMembershipListItemComponent } from './classroom-detail-sidebar-membership-list-item/classroom-detail-sidebar-membership-list-item.component';
import { ClassroomDetailSidebarMembershipListComponent } from './classroom-detail-sidebar-membership-list/classroom-detail-sidebar-membership-list.component';
import { ClassroomDetailSidebarComponent } from './classroom-detail-sidebar/classroom-detail-sidebar.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomRedirectorComponent } from './classroom-redirector/classroom-redirector.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';

@NgModule({
  declarations: [
    ClassroomsComponent,
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
    ClassroomDetailSettingsSectionComponent,
    ClassroomDetailAssignmentsItemDetailComponent,
  ],
  imports: [
    SharedModule,
    ClassroomsRoutingModule,
    ProfileModule,
    SidenavModule,
  ],
})
export class ClassroomsModule {}
