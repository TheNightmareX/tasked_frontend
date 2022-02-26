import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeButtonComponent } from './theme-button/theme-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemedFormFieldDirective } from './themed-form-field.directive';

@NgModule({
  declarations: [ThemeButtonComponent, ThemedFormFieldDirective],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ThemeButtonComponent, ThemedFormFieldDirective],
})
export class ThemeModule {}
