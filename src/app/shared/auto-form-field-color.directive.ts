import { Directive, Host, OnDestroy, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme/theme.service';

@Directive({
  selector: '[appAutoFormFieldColor]',
})
export class AutoFormFieldColorDirective implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private theme: ThemeService,
    @Host() private matFormField: MatFormField,
  ) {}

  ngOnInit() {
    this.subscription = this.theme.current.value$.subscribe((theme) => {
      this.matFormField.color = theme == 'light' ? 'primary' : 'accent';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
