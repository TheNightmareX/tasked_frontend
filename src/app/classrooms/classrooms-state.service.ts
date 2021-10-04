import { Injectable } from '@angular/core';
import { LocalStorageService } from '../core/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsStateService {
  activeId?: number;

  constructor(storage: LocalStorageService) {
    this.activeId = storage.load<number | undefined>(
      'classroom',
      undefined,
      (value): value is this['activeId'] => typeof value == 'number',
      () => this.activeId,
    );
  }
}
