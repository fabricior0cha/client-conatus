export class BasicModelResource<T> {
  id: number;

  public constructor(model: T) {
    if (model) {
      Object.assign(this, model);
    }
  }
}
