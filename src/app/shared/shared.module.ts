import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { EqualDirective } from './equal.directive';
import { LayoutComponent } from './layout/layout.component';

const modules = [CommonModule, FormsModule];
const components = [LayoutComponent];
const directives = [EqualDirective];

@NgModule({
  declarations: [components, directives],
  imports: [modules, NzLayoutModule, NzMenuModule, RouterModule],
  exports: [modules, components, directives],
})
export class SharedModule {}
