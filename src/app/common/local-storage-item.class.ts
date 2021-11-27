export class LocalStorageItem<Value> {
  value: Value;
  passed = false;

  constructor(
    public key: Key,
    private validator: (dirty: unknown) => boolean,
    private initial: Value,
  ) {
    [this.value, this.passed] = this.load();
  }

  load(): [value: Value, passed: boolean] {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw == null) throw new UseInitialValue();
      const dirty = JSON.parse(raw);
      if (!this.validator(dirty)) throw new UseInitialValue();
      return [dirty, true];
    } catch (error) {
      if (error instanceof UseInitialValue || error instanceof SyntaxError)
        return [this.initial, false];
      else throw error;
    }
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.value));
  }
}

class UseInitialValue {}

type Key = string;
