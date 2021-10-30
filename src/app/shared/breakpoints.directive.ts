import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { BreakpointsService } from '../core/breakpoints.service';

@Directive({
  selector: '[appBreakpoints]',
  exportAs: 'breakpoints',
})
export class BreakpointsDirective implements OnInit, OnDestroy {
  @HostBinding('class.phone')
  phone?: boolean;

  @HostBinding('class.mobile')
  mobile?: boolean;

  private subscription!: Subscription;

  constructor(private breakpoints: BreakpointsService) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.breakpoints.mobile$,
      this.breakpoints.phone$,
    ]).subscribe(([isMobile, isPhone]) => {
      // activate the change detection on purpose
      setTimeout(() => {
        this.phone = isPhone;
        this.mobile = isMobile;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
