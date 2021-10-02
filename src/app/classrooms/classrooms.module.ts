import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsSidenavComponent } from './classrooms-sidenav/classrooms-sidenav.component';
import { ClassroomsComponent } from './classrooms.component';

@NgModule({
  declarations: [ClassroomsComponent, ClassroomsSidenavComponent],
  imports: [
    SharedModule,
    ClassroomsRoutingModule,
    MatListModule,
    MatIconModule,
  ],
})
export class ClassroomsModule {}
