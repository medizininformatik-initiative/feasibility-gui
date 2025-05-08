import { BasicField } from './BasicField';
import { SelectedField } from '../SelectedField';
import { AbstractSelectedField } from '../AbstractSelectedField';

export class SelectedBasicField extends AbstractSelectedField {
  private selectedField: SelectedField<BasicField>;

  constructor(field: BasicField, mustHave: boolean) {
    super(mustHave);
    this.selectedField = new SelectedField(field, mustHave);
  }

  public setSelectedField(field: BasicField): void {
    this.selectedField.setField(field);
  }

  public getSelectedField(): BasicField {
    return this.selectedField.getField();
  }

  public getDisplay() {
    return this.selectedField.field.getDisplay();
  }

  public getDescription() {
    return this.selectedField.field.getDescription();
  }

  public getElementId() {
    return this.selectedField.field.getElementId();
  }

  public getIsRequired(): boolean {
    return this.selectedField.field.getIsRequired();
  }
}
