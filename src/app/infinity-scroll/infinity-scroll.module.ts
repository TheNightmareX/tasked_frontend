import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';

import { InfinityScrollTriggerComponent } from './infinity-scroll-trigger/infinity-scroll-trigger.component';

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
