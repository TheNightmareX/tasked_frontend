import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchMoreTriggerComponent } from './fetch-more-trigger/fetch-more-trigger.component';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [FetchMoreTriggerComponent],
  imports: [CommonModule, IntersectionObserverModule, MatProgressSpinnerModule],
  exports: [FetchMoreTriggerComponent],
})
export class InfinityScrollModule {}
