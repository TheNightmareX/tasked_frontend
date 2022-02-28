import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HelpIconComponent } from './help-icon/help-icon.component';

@NgModule({
  declarations: [HelpIconComponent],
  imports: [CommonModule, MatTooltipModule, MatIconModule],
  exports: [HelpIconComponent],
})
export class HelpIconModule {}
