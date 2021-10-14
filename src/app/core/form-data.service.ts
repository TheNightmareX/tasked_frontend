import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  constructor() {}

  filterEmpty<T>(data: T) {
    for (const key in data) {
      const value = data[key];
      if (typeof value == 'string' && value == '') delete data[key];
    }
    return data;
  }

  filterUnchanged<T>(data: T, origin: Partial<Record<keyof T, unknown>>) {
    for (const key in data) {
      if (data[key] == origin[key]) delete data[key];
    }
    return data;
  }

  pick<T, K extends keyof T>(data: T, keys: readonly K[]) {
    const ret: Partial<T> = {};
    for (const key of keys) {
      ret[key] = data[key];
    }
    return ret as Pick<T, K>;
  }
}
