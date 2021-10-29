import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ClassroomCreationComponent } from './classroom-creation/classroom-creation.component';
import { ClassroomDetailAssignmentsComponent } from './classroom-detail-assignments/classroom-detail-assignments.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomRedirectorComponent } from './classroom-redirector/classroom-redirector.component';
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
        path: 'last',
        component: ClassroomRedirectorComponent,
      },
      {
        path: ':id',
        component: ClassroomDetailComponent,
        children: [
          {
            path: 'assignments',
            component: ClassroomDetailAssignmentsComponent,
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
