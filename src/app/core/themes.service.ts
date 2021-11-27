import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LocalStorageItem } from '../common/local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  get current$() {
    return this._current$.asObservable();
  }
  private _current$ = new ReplaySubject<Theme>(1);

  private $body = document.querySelector('body')!;
  private current = new LocalStorageItem<Theme>(
    'theme',
    (v) => (v as Theme) == 'light' || (v as Theme) == 'dark',
    'light',
  );

  constructor() {}

  init() {
    this.apply(this.current.value);
  }

  apply(theme: Theme) {
    this.$body.classList.remove(this.getClassName(this.current.value));
    this.$body.classList.add(this.getClassName(theme));
    this.current.value = theme;
    this.current.save();
    this._current$.next(theme);
  }

  toggle() {
    if (this.current.value == 'light') this.apply('dark');
    else this.apply('light');
  }

  private getClassName(theme: Theme) {
    return `theme-${theme}`;
  }
}

type Theme = 'light' | 'dark';
