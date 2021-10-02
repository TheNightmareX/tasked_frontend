import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomRedirectorComponent } from './classroom-redirector/classroom-redirector.component';
import { ClassroomsComponent } from './classrooms.component';

const routes: Routes = [
  {
    path: 'classrooms',
    component: ClassroomsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ClassroomRedirectorComponent,
      },
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
