export class Filter<T> {
  private currentFilter: T;
  private updatedFilter: T;

  constructor(initialFilter: T) {
    this.currentFilter = initialFilter;
    this.updatedFilter = initialFilter;
  }

  public get value() {
    return this.updatedFilter;
  }

  public set value(newValue: T) {
    this.updatedFilter = newValue;
  }

  public filterChanged() {
    return this.currentFilter !== this.updatedFilter;
  }

  public updateValue() {
    this.currentFilter = this.updatedFilter;
  }
}
