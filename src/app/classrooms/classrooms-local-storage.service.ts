import { Injectable } from '@angular/core';
import { LocalStorageItem } from '../common/local-storage-item.class';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsLocalStorageService {
  lastActivatedClassroomMap: LocalStorageItem<Map>;

  constructor() {
    this.lastActivatedClassroomMap = new LocalStorageItem(
      'lastActivatedClassroomMap',
      (v) =>
        typeof v == 'object' &&
        !!v &&
        Object.entries(v).every(
          ([userId, classroomId]) =>
            typeof userId == 'string' && typeof classroomId == 'string',
        ),
      {},
    );
  }
}

type Map = Record<string, string>;
