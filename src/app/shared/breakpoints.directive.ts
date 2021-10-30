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

  constructor(private breakpoints: BreakpointsService) {
    // The properties must be assigned before initializing the input value of
    // components (of course also before `ngInit`) because there may be some
    // components' input requiring them.
    this.subscription = combineLatest([
      this.breakpoints.mobile$,
      this.breakpoints.phone$,
    ]).subscribe(([isMobile, isPhone]) => {
      this.phone = isPhone;
      this.mobile = isMobile;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
