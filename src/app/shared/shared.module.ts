import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../material/material.module';
import { ValidationModule } from '../validation/validation.module';
import { ContainerComponent } from './container/container.component';
import { UsernameComponent } from './username/username.component';

const modules = [
  FormsModule,
  RouterModule,
  FlexLayoutModule,
  NgxSkeletonLoaderModule,
  MaterialModule,
  ValidationModule,
];

const components = [UsernameComponent, ContainerComponent];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components],
})
export class SharedModule {}
