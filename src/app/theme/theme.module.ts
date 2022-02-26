import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeButtonComponent } from './theme-button/theme-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AutoFormFieldColorDirective } from './auto-form-field-color.directive';

@NgModule({
  declarations: [ThemeButtonComponent, AutoFormFieldColorDirective],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ThemeButtonComponent, AutoFormFieldColorDirective],
})
export class ThemeModule {}
