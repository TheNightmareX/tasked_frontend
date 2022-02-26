import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeButtonComponent } from './theme-button/theme-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ThemeButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ThemeButtonComponent],
})
export class ThemeModule {}
