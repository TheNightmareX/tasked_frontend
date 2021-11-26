import { Injectable } from '@angular/core';
import { LocalStorageItem } from '../common/local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  current = new LocalStorageItem(
    'theme',
    (v) => (v as Theme) == 'light' || (v as Theme) == 'dark',
    'light',
  );

  get light() {
    return this.current.value == 'light';
  }
  get dark() {
    return this.current.value == 'dark';
  }

  private $body = document.querySelector('body')!;

  constructor() {}

  init() {
    this.apply(this.current.value);
  }

  apply(theme: Theme) {
    if (this.current)
      this.$body.classList.remove(this.getClassName(this.current.value));
    this.$body.classList.add(this.getClassName(theme));
    this.current.value = theme;
    this.current.save();
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
