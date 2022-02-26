import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfinityScrollTriggerComponent } from './infinity-scroll-trigger/infinity-scroll-trigger.component';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [InfinityScrollTriggerComponent],
  imports: [CommonModule, IntersectionObserverModule, MatProgressSpinnerModule],
  exports: [InfinityScrollTriggerComponent],
})
export class InfinityScrollModule {}
