import { Display } from '../Display';
import { AbstractField } from './AbstractField';

export abstract class AbstractSelectedField extends AbstractField {
  private mustHave = false;

  constructor(
    display: Display,
    description: Display,
    elementId: string,
    mustHave: boolean,
    isRequired: boolean = false,
    recommended: boolean = false
  ) {
    super(elementId, display, description, isRequired, recommended);
    this.mustHave = mustHave;
  }

  public getMustHave(): boolean {
    return this.mustHave;
  }

  public setMustHave(mustHave: boolean): void {
    this.mustHave = mustHave;
  }
}
