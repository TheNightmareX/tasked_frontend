import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ContainerComponent } from './container/container.component';
import { UsernameComponent } from './username/username.component';

const modules = [MaterialModule];

const components = [UsernameComponent, ContainerComponent];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components],
})
export class SharedModule {}
