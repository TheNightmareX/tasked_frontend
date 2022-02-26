import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsernameComponent } from './username/username.component';

@NgModule({
  declarations: [UsernameComponent],
  imports: [CommonModule],
  exports: [UsernameComponent],
})
export class UsernameModule {}
