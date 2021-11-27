export class LocalStorageItem<Value> {
  value: Value;
  passed: boolean;

  constructor(
    public key: Key,
    private validator: (dirty: unknown) => boolean,
    private initial: Value | (() => Value),
  ) {
    const result = this.load().save();
    [this.value, this.passed] = [result.value, result.passed];
  }

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw == null) throw new UseInitialValue();
      const dirty = JSON.parse(raw);
      if (!this.validator(dirty)) throw new UseInitialValue();
      const validated = dirty;
      this.value = validated;
      this.passed = true;
    } catch (error) {
      if (!(error instanceof UseInitialValue || error instanceof SyntaxError))
        throw error;
      this.value =
        this.initial instanceof Function ? this.initial() : this.initial;
      this.passed = false;
    } finally {
      return this;
    }
  }

  save(value = this.value) {
    this.value = value;
    localStorage.setItem(this.key, JSON.stringify(this.value));
    return this;
  }
}

class UseInitialValue {}

type Key = string;
