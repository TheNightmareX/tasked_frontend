import { Injectable } from '@angular/core';
import { LocalStorageItem } from './local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage extends LocalStorageItem<string | null> {
  constructor() {
    super('token', (v) => v == null || typeof v == 'string', null);
  }
}
