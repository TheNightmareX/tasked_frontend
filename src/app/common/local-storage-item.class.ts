export class LocalStorageItem<Value> {
  value: Value = this.initial;
  passed = false;

  constructor(
    public key: Key,
    private validator: (dirty: unknown) => boolean,
    private initial: Value,
  ) {
    this.load().save();
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
      this.value = this.initial;
      this.passed = false;
    } finally {
      return this;
    }
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.value));
    return this;
  }
}

class UseInitialValue {}

type Key = string;
