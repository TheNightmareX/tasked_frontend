import { Directive, HostListener } from '@angular/core';

/**
 * Stop the propagation of the ripple effect.
 *
 * The ripple renderer listens to "mousedown" and "touchstart" events:
 *
 * https://github.com/angular/components/blob/202c667e3439e7412fed981993aa51ee2b0f41f6/src/material/core/ripple/ripple-renderer.ts#L46
 */
@Directive({
  selector: '[appStopRipplePropagation]',
})
export class StopRipplePropagationDirective {
  constructor() {}

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('touchstart', ['$event'])
  handleTouchStart(event: TouchEvent) {
    event.stopPropagation();
  }
}
