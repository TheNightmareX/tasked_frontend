import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LayoutComponent } from './layout/layout.component';

const modules = [CommonModule, FormsModule];
const components = [LayoutComponent];

@NgModule({
  declarations: [components],
  imports: [modules, NzLayoutModule, NzMenuModule],
  exports: [modules, components],
})
export class SharedModule {}
