export abstract class ValueObject<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = this.validate(value);
  }
  protected abstract validate(value: typeof this.value): typeof this.value;
}
