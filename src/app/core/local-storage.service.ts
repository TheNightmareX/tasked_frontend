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
   * Load a value from the local storage.
   * @param options
   * @returns
   */
  load<T>({ key, validator, valueOnError, valueOnSave }: LoadOptions<T>) {
    let value = valueOnError;

    const rawValue = localStorage.getItem(key);
    if (rawValue != null) {
      const dirtyValue = this.parse(rawValue);
      if (dirtyValue !== undefined && validator(dirtyValue)) value = dirtyValue;
    }

    if (valueOnSave) this.persist(key, valueOnSave);

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

interface LoadOptions<T> {
  /**
   * The key of the value stored in the local storage.
   */
  key: string;
  /**
   * The validator to validate whether the parsed value is expected.
   */
  validator: (dirtyValue: unknown) => dirtyValue is T;
  /**
   * The alternative to use when the validation fails.
   */
  valueOnError: T;
  /**
   * The value to save on window unload. Won't save if not provided.
   */
  valueOnSave?: () => T;
}
