import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ContainerComponent } from './container/container.component';

const modules = [MaterialModule];

const components = [ContainerComponent];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components],
})
export class SharedModule {}
