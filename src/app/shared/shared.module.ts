import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from '../theme/theme.module';

@NgModule({
  exports: [CommonModule, FormsModule, FlexLayoutModule, ThemeModule],
})
export class SharedModule {}
