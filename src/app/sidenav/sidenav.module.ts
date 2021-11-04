import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SidenavClassroomsComponent } from './sidenav-classrooms/sidenav-classrooms.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [SidenavComponent, SidenavClassroomsComponent],
  imports: [SharedModule, RouterModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
