import { Injectable } from '@angular/core';
import { LocalStorageService } from '../core/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsLocalStorageService {
  lastActivatedClassroomMap: Record<string, string>;

  constructor(private storage: LocalStorageService) {
    this.lastActivatedClassroomMap = this.storage.load({
      key: 'lastActivatedClassroomMap',
      validator: (v): v is this['lastActivatedClassroomMap'] =>
        typeof v == 'object' &&
        !!v &&
        Object.entries(v).every(
          ([userId, classroomId]) =>
            typeof userId == 'string' && typeof classroomId == 'string',
        ),
      valueOnError: {},
      valueOnSave: () => this.lastActivatedClassroomMap,
    });
  }
}
