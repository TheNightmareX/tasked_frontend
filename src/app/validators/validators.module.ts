import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualDirective } from './equal.directive';

@NgModule({
  declarations: [EqualDirective],
  imports: [CommonModule],
  exports: [EqualDirective],
})
export class ValidatorsModule {}
