import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskCreationComponent } from './task-creation/task-creation.component';

@NgModule({
  declarations: [TasksComponent, TaskCreationComponent],
  imports: [SharedModule, TasksRoutingModule],
})
export class TasksModule {}
