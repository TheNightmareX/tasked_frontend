import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { EqualDirective } from './equal.directive';
import { LayoutComponent } from './layout/layout.component';
import { LoadingDirective } from './loading.directive';

const modules = [CommonModule, FormsModule];
const components = [LayoutComponent];
const directives = [EqualDirective, LoadingDirective];

@NgModule({
  declarations: [components, directives],
  imports: [
    modules,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  exports: [modules, components, directives],
})
export class SharedModule {}
