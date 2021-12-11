import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { ValidationModule } from '../validation/validation.module';
import { AutoFormFieldColorDirective } from './auto-form-field-color.directive';
import { FetchMoreTriggerComponent } from './fetch-more-trigger/fetch-more-trigger.component';
import { LoadingDirective } from './loading.directive';
import { PopupComponent } from './popup/popup.component';
import { SharedMaterialModule } from './shared-material.module';
import { UsernameComponent } from './username/username.component';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  FlexLayoutModule,
  IntersectionObserverModule,
  ValidationModule,
  SharedMaterialModule,
];

const components = [
  PopupComponent,
  UsernameComponent,
  FetchMoreTriggerComponent,
];

const directives = [AutoFormFieldColorDirective, LoadingDirective];

@NgModule({
  declarations: [components, directives],
  imports: [modules],
  exports: [modules, components, directives],
})
export class SharedModule {}
