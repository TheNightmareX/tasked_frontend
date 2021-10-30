import { Directive, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { BreakpointsService } from '../core/breakpoints.service';

@Directive({
  selector: '[appBreakpoints]',
  exportAs: 'breakpoints',
})
export class BreakpointsDirective implements OnInit, OnDestroy {
  @HostBinding('class.phone')
  phone = false;

  @HostBinding('class.mobile')
  mobile = false;

  private subscription!: Subscription;

  constructor(private breakpoints: BreakpointsService) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.breakpoints.mobile$,
      this.breakpoints.phone$,
    ]).subscribe(([isMobile, isPhone]) => {
      this.phone = isPhone;
      this.mobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
