import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
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
        path: ':id',
        component: ClassroomDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomsRoutingModule {}
