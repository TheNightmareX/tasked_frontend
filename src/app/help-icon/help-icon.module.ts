import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpIconComponent } from './help-icon/help-icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HelpIconComponent],
  imports: [CommonModule, MatTooltipModule, MatIconModule],
  exports: [HelpIconComponent],
})
export class HelpIconModule {}
