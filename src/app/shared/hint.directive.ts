import { Directive, Host, HostListener, Input, Optional } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appHint]',
})
export class HintDirective {
  @Input() appHint = '';

  constructor(
    private snackbar: MatSnackBar,
    @Host() @Optional() private toolTip?: MatTooltip,
  ) {}

  @HostListener('click')
  hint() {
    const message = this.toolTip?.message ?? this.appHint;
    if (message)
      this.snackbar.open(message, $localize`Got it`, {
        duration: 5000,
      });
  }
}
