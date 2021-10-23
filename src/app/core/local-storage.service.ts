import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private valueToSaveMap = new Map<string, () => unknown>();

  constructor() {
    window.addEventListener('unload', () => {
      this.valueToSaveMap.forEach((valueToSave, key) => {
        this.save(key, valueToSave());
      });
    });
  }

  /**
   * Load a value from the local storage and save it on window unload.
   * @param key - local storage key
   * @param alternative - default value to be used when the value cannot be loaded
   * @param validate - will be called to validate the parsed value from the local storage
   * @param get - will be called to get the value for saving on window unload
   */
  load<T>(
    key: string,
    alternative: T,
    validate: (value: unknown) => value is T,
    valueToSave?: () => T,
  ) {
    let value = alternative;

    const rawValue = localStorage.getItem(key);
    if (rawValue != null) {
      const dirtyValue = this.parse(rawValue);
      if (dirtyValue !== undefined && validate(dirtyValue)) value = dirtyValue;
    }

    if (valueToSave) this.persist(key, valueToSave);

    return value;
  }

  save(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  persist(key: string, valueToSave: () => unknown) {
    this.valueToSaveMap.set(key, valueToSave);
  }

  depersist(key: string) {
    this.valueToSaveMap.delete(key);
  }

  private parse<T>(value: string) {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return;
    }
  }
}
