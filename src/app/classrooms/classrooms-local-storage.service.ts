import { Injectable } from '@angular/core';
import { LocalStorageService } from '../core/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsLocalStorageService {
  lastActiveId?: string;

  constructor(private storage: LocalStorageService) {
    this.lastActiveId = this.storage.load(
      'classroom',
      undefined,
      (v): v is string => typeof v == 'string',
      () => this.lastActiveId,
    );
  }
}
