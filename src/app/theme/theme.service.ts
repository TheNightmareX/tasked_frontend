import { Injectable } from '@angular/core';
import { LocalStorageItem } from '../local-storage/local-storage-item.class';
import { ThemeStorage } from '../local-storage/theme.storage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public current: LocalStorageItem<Theme>;

  private $root: HTMLHtmlElement;
  private $themeColorMeta: HTMLMetaElement;

  constructor(storage: ThemeStorage) {
    this.current = storage.next(storage.value ?? this.getPreference());
    this.$root = document.documentElement as HTMLHtmlElement;
    this.$themeColorMeta = document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;
  }

  init() {
    this.apply(this.current.value);
  }

  apply(theme: Theme) {
    this.$root.classList.remove(this.getClassName(this.current.value));
    this.$root.classList.add(this.getClassName(theme));
    this.$themeColorMeta.content = this.getThemeColor();
    this.current.next(theme).save();
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

  private getThemeColor() {
    return getComputedStyle(this.$root)
      .getPropertyValue('--pwa-theme-color')
      .trim();
  }
}

export type Theme = 'light' | 'dark';
