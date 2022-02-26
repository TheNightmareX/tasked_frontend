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
import { LoadingDirective } from './loading.directive';
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

const directives = [LoadingDirective];

@NgModule({
  declarations: [components, directives],
  imports: [modules],
  exports: [modules, components, directives],
})
export class SharedModule {}
