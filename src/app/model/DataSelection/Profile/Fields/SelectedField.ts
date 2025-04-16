import { AbstractField } from './AbstractField';

export class SelectedField<T extends AbstractField> {
  field: T;
  mustHave: boolean;

  constructor(field: T, mustHave: boolean) {
    this.field = field;
    this.mustHave = mustHave;
  }

  public getField(): T {
    return this.field;
  }

  public setField(field: T): void {
    this.field = field;
  }

  public getMustHave(): boolean {
    return this.mustHave;
  }

  public setMustHave(mustHave: boolean): void {
    this.mustHave = mustHave;
  }
}
