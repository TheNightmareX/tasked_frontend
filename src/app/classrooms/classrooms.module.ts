import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';

@NgModule({
  declarations: [ClassroomsComponent, ClassroomListComponent],
  imports: [
    SharedModule,
    ClassroomsRoutingModule,
    MatListModule,
    MatIconModule,
  ],
})
export class ClassroomsModule {}
