import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContainerModule } from '../container/container.module';
import { HelpIconModule } from '../help-icon/help-icon.module';
import { InfinityScrollModule } from '../infinity-scroll/infinity-scroll.module';
import { LoadingModule } from '../loading/loading.module';
import { ModalModule } from '../modal/modal.module';
import { ThemeModule } from '../theme/theme.module';
import { UsernameModule } from '../username/username.module';
import { RoomCreationComponent } from './room-creation/room-creation.component';
import { RoomDetailAssignmentsItemDetailComponent } from './room-detail-assignments-item-detail/room-detail-assignments-item-detail.component';
import { RoomDetailAssignmentsItemComponent } from './room-detail-assignments-item/room-detail-assignments-item.component';
import { RoomDetailAssignmentsComponent } from './room-detail-assignments/room-detail-assignments.component';
import { RoomDetailSettingsActionsComponent } from './room-detail-settings-actions/room-detail-settings-actions.component';
import { RoomDetailSettingsSectionComponent } from './room-detail-settings-section/room-detail-settings-section.component';
import { RoomDetailSettingsComponent } from './room-detail-settings/room-detail-settings.component';
import { RoomDetailSidebarMembershipListItemMenuComponent } from './room-detail-sidebar-membership-list-item-menu/room-detail-sidebar-membership-list-item-menu.component';
import { RoomDetailSidebarMembershipListItemComponent } from './room-detail-sidebar-membership-list-item/room-detail-sidebar-membership-list-item.component';
import { RoomDetailSidebarMembershipListComponent } from './room-detail-sidebar-membership-list/room-detail-sidebar-membership-list.component';
import { RoomDetailSidebarComponent } from './room-detail-sidebar/room-detail-sidebar.component';
import { RoomDetailTabRedirectorComponent } from './room-detail-tab-redirector/room-detail-tab-redirector.component';
import { RoomDetailTasksCreationBarComponent } from './room-detail-tasks-creation-bar/room-detail-tasks-creation-bar.component';
import { RoomDetailTasksItemAssignPopupComponent } from './room-detail-tasks-item-assign-popup/room-detail-tasks-item-assign-popup.component';
import { RoomDetailTasksItemComponent } from './room-detail-tasks-item/room-detail-tasks-item.component';
import { RoomDetailTasksComponent } from './room-detail-tasks/room-detail-tasks.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomListItemComponent } from './room-list-item/room-list-item.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomRedirectorComponent } from './room-redirector/room-redirector.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomDetailComponent,
    RoomCreationComponent,
    RoomDetailAssignmentsComponent,
    RoomDetailAssignmentsItemComponent,
    RoomDetailAssignmentsItemDetailComponent,
    RoomDetailTasksComponent,
    RoomDetailTasksItemComponent,
    RoomDetailTasksItemAssignPopupComponent,
    RoomDetailTasksCreationBarComponent,
    RoomDetailSettingsComponent,
    RoomDetailSettingsSectionComponent,
    RoomDetailSettingsActionsComponent,
    RoomDetailTabRedirectorComponent,
    RoomDetailSidebarComponent,
    RoomDetailSidebarMembershipListComponent,
    RoomDetailSidebarMembershipListItemComponent,
    RoomDetailSidebarMembershipListItemMenuComponent,
    RoomRedirectorComponent,
    RoomListComponent,
    RoomListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    RoomsRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    NgxSkeletonLoaderModule,
    ThemeModule,
    InfinityScrollModule,
    ModalModule,
    HelpIconModule,
    LoadingModule,
    UsernameModule,
    ContainerModule,
  ],
})
export class RoomsModule {}
