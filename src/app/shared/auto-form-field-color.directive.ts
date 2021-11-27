import { Directive, Host, OnDestroy, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ThemesService } from '../core/themes.service';

@Directive({
  selector: '[appAutoFormFieldColor]',
})
export class AutoFormFieldColorDirective implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private themes: ThemesService,
    @Host() private matFormField: MatFormField,
  ) {}

  ngOnInit() {
    this.subscription = this.themes.current$.subscribe((theme) => {
      this.matFormField.color = theme == 'light' ? 'primary' : 'accent';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
