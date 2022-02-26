import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../material/material.module';
import { ValidationModule } from '../validation/validation.module';
import { ContainerComponent } from './container/container.component';
import { UsernameComponent } from './username/username.component';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  FlexLayoutModule,
  OverlayModule,
  IntersectionObserverModule,
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
