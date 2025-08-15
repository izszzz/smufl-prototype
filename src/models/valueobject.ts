export abstract class ValueObject<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = this.validate(value);
  }
  protected abstract validate(value: typeof this.value): typeof this.value;
}
