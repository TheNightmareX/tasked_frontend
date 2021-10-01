import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EqualDirective } from './equal.directive';
import { LayoutComponent } from './layout/layout.component';

const modules = [CommonModule, FormsModule];
const components = [LayoutComponent];
const directives = [EqualDirective];

@NgModule({
  declarations: [components, directives],
  imports: [modules, RouterModule],
  exports: [modules, components, directives],
})
export class SharedModule {}
