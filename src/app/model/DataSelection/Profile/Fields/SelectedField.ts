import { AbstractField } from './AbstractField';

export class SelectedField<T extends AbstractField> {
  field: T;

  constructor(field: T, mustHave: boolean) {
    this.field = field;
  }

  public getField(): T {
    return this.field;
  }

  public setField(field: T): void {
    this.field = field;
  }
}
