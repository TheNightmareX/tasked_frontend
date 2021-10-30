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
    // Avoid unexpectedly changing the input value of components before the
    // change detection is completed, which will cause an error in dev mode.
    setTimeout(() => {
      this.subscription = combineLatest([
        this.breakpoints.mobile$,
        this.breakpoints.phone$,
      ]).subscribe(([isMobile, isPhone]) => {
        this.phone = isPhone;
        this.mobile = isMobile;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
