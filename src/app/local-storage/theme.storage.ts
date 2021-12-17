import { Injectable } from '@angular/core';
import { Theme } from '../core/theme.service';
import { LocalStorageItem } from './local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorage extends LocalStorageItem<Theme | null> {
  constructor() {
    super(
      'theme',
      (v) => (v as Theme) == 'light' || (v as Theme) == 'dark',
      null,
    );
  }
}
