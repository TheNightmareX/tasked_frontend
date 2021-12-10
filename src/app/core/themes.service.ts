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
  private current: LocalStorageItem<Theme>;
  private $root = document.documentElement;

  constructor() {
    this.current = new LocalStorageItem(
      'theme',
      (v) => (v as Theme) == 'light' || (v as Theme) == 'dark',
      () => this.getPreference(),
    );
  }

  init() {
    this.apply(this.current.value);
  }

  apply(theme: Theme) {
    this.$root.classList.remove(this.getClassName(this.current.value));
    this.$root.classList.add(this.getClassName(theme));
    this.current.save(theme);
    this._current$.next(theme);
  }

  toggle() {
    this.apply(this.current.value == 'light' ? 'dark' : 'light');
  }

  private getClassName(theme: Theme) {
    return `theme-${theme}`;
  }

  private getPreference(): Theme {
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}

type Theme = 'light' | 'dark';
