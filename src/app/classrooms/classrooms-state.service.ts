import { Injectable } from '@angular/core';
import { LocalStorageService } from '../core/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsStateService {
  activeId?: string;

  constructor(storage: LocalStorageService) {
    this.activeId = storage.load<this['activeId']>(
      'classroom',
      undefined,
      (value): value is this['activeId'] => typeof value == 'string',
      () => this.activeId,
    );
  }
}
