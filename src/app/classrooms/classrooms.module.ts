import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import { ClassroomListComponent } from './classroom-list/classroom-list.component';
import { ClassroomRedirectorComponent } from './classroom-redirector/classroom-redirector.component';
import { ClassroomsRoutingModule } from './classrooms-routing.module';
import { ClassroomsComponent } from './classrooms.component';

@NgModule({
  declarations: [
    ClassroomsComponent,
    ClassroomListComponent,
    ClassroomRedirectorComponent,
    ClassroomDetailComponent,
  ],
  imports: [
    SharedModule,
    ClassroomsRoutingModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class ClassroomsModule {}
