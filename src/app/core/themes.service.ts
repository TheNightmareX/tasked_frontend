import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  current?: Theme;

  get light() {
    return this.current == 'light';
  }
  get dark() {
    return this.current == 'dark';
  }

  private $body = document.querySelector('body')!;

  constructor() {}

  apply(theme: Theme) {
    if (this.current)
      this.$body.classList.remove(this.getClassName(this.current));
    this.$body.classList.add(this.getClassName(theme));
    this.current = theme;
  }

  toggle() {
    if (this.light) this.apply('dark');
    else this.apply('light');
  }

  private getClassName(theme: Theme) {
    return `theme-${theme}`;
  }
}

type Theme = 'light' | 'dark';
