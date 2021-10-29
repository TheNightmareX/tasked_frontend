import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ClassroomCreationComponent } from './classroom-creation/classroom-creation.component';
import { ClassroomDetailTabAssignmentsComponent } from './classroom-detail-tab-assignments/classroom-detail-tab-assignments.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomsComponent } from './classrooms.component';

const routes: Routes = [
  {
    path: 'classrooms',
    component: ClassroomsComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: ClassroomCreationComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: ClassroomDetailComponent,

        children: [
          {
            path: 'assignments',
            component: ClassroomDetailTabAssignmentsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomsRoutingModule {}
