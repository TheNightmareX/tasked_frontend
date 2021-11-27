import { Directive, Host, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { ThemesService } from '../core/themes.service';

@Directive({
  selector: '[appAutoFormFieldColor]',
})
export class AutoFormFieldColorDirective implements OnInit {
  constructor(
    private themes: ThemesService,
    @Host() private matFormField: MatFormField,
  ) {}

  ngOnInit() {
    this.matFormField.color =
      this.themes.current == 'light' ? 'primary' : 'accent';
  }
}
