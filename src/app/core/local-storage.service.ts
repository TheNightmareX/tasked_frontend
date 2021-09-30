import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule,
})
export class LocalStorageService {
  private readonly windowUnloadEvent$ = fromEvent(
    window,
    'unload' as keyof WindowEventMap,
  );

  constructor() {}

  /**
   * Load a value from the local storage and save it on window unload.
   * @param key - local storage key
   * @param alternative - default value to be used when the value cannot be loaded
   * @param validate - will be called to validate the parsed value from the local storage
   * @param get - will be called to get the value for saving on window unload
   */
  load<T extends Record<string, unknown>>(
    key: string,
    alternative: T,
    validate: (value: unknown) => value is T,
  ): T;
  load<T>(
    key: string,
    alternative: T,
    validate: (value: unknown) => value is T,
    getValue: () => T,
  ): T;
  load<T>(
    key: string,
    alternative: T,
    validate: (value: unknown) => value is T,
    getValue?: () => T,
  ) {
    let value = alternative;

    const rawValue = localStorage.getItem(key);
    if (rawValue != null) {
      const dirtyValue = this.parse(rawValue);
      if (dirtyValue !== undefined && validate(dirtyValue)) value = dirtyValue;
    }

    this.windowUnloadEvent$.subscribe(() =>
      localStorage.setItem(key, JSON.stringify(getValue ? getValue() : value)),
    );

    return value;
  }

  private parse<T>(value: string) {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return;
    }
  }
}
