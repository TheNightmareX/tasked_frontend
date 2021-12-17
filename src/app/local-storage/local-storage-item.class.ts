import { Observable, ReplaySubject } from 'rxjs';

export class LocalStorageItem<Value> {
  get value() {
    return this._value;
  }
  private _value!: Value;

  value$: Observable<Value>;
  private _value$ = new ReplaySubject<Value>(1);

  constructor(
    public key: Key,
    private validator: (dirty: unknown) => boolean,
    private initial: Value | (() => Value),
  ) {
    this.value$ = this._value$.asObservable();
    this.load().save();
  }

  /**
   * Update the current value.
   * @param value
   * @returns
   */
  next(value: Value) {
    this._value = value;
    this._value$.next(value);
    return this;
  }

  /**
   * Load a value from `LocalStorage` and overwrite the current one.
   * @returns
   */
  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw == null) throw new UseInitialValue();
      const dirty = JSON.parse(raw);
      if (!this.validator(dirty)) throw new UseInitialValue();
      const validated = dirty;
      this.next(validated);
    } catch (error) {
      if (!(error instanceof UseInitialValue || error instanceof SyntaxError))
        throw error;
      this.next(
        this.initial instanceof Function ? this.initial() : this.initial,
      );
    } finally {
      return this;
    }
  }

  /**
   * Save the current value to `LocalStorage`.
   * @returns
   */
  save() {
    localStorage.setItem(this.key, JSON.stringify(this.value));
    return this;
  }
}

class UseInitialValue {}

type Key = string;
