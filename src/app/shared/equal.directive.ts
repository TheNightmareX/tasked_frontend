import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appEqual]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualDirective, multi: true },
  ],
})
export class EqualDirective implements Validator {
  @Input() appEqual = '';

  constructor() {}

  validate(control: AbstractControl) {
    if (control.value == this.appEqual) return null;
    else return { equal: false };
  }
}
