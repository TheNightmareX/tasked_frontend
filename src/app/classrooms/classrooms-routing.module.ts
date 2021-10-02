import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomsComponent } from './classrooms.component';

const routes: Routes = [
  {
    path: 'classrooms',
    component: ClassroomsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomsRoutingModule {}
