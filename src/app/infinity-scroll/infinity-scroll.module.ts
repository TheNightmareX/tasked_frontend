import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfinityScrollTriggerComponent } from './infinity-scroll-trigger/infinity-scroll-trigger.component';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [InfinityScrollTriggerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IntersectionObserverModule,
    MatProgressSpinnerModule,
  ],
  exports: [InfinityScrollTriggerComponent],
})
export class InfinityScrollModule {}
