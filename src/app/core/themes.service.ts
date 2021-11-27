import { Injectable } from '@angular/core';
import { LocalStorageItem } from '../common/local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  get current() {
    return this._current.value;
  }
  private _current = new LocalStorageItem<Theme>(
    'theme',
    (v) => (v as Theme) == 'light' || (v as Theme) == 'dark',
    'light',
  );

  private $body = document.querySelector('body')!;

  constructor() {}

  init() {
    this.apply(this.current);
  }

  apply(theme: Theme) {
    this.$body.classList.remove(this.getClassName(this.current));
    this.$body.classList.add(this.getClassName(theme));
    this._current.value = theme;
    this._current.save();
  }

  toggle() {
    if (this.current == 'light') this.apply('dark');
    else this.apply('light');
  }

  private getClassName(theme: Theme) {
    return `theme-${theme}`;
  }
}

type Theme = 'light' | 'dark';
