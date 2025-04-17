import { AbstractSelectedField } from '../AbstractSelectedField';
import { SelectedField } from '../SelectedField';
import { ReferenceField } from './ReferenceField';

export class SelectedReferenceField extends AbstractSelectedField {
  private linkedProfileIds: string[] = [];
  private selectedField: SelectedField<ReferenceField>;

  constructor(field: ReferenceField, linkedProfileIds: string[], mustHave: boolean) {
    super(mustHave);
    this.selectedField = new SelectedField(field, mustHave);
    this.linkedProfileIds = linkedProfileIds;
  }

  public setSelectedField(field: ReferenceField): void {
    this.selectedField.setField(field);
  }

  public getSelectedField(): ReferenceField {
    return this.selectedField.getField();
  }

  public getLinkedProfileIds(): string[] {
    return this.linkedProfileIds;
  }

  public setLinkedProfileIds(linkedProfileIds: string[]): void {
    this.linkedProfileIds = linkedProfileIds;
  }

  public addLinkedProfileIds(newIds: string[]): void {
    this.linkedProfileIds.push(...newIds);
  }

  public getElementId(): string {
    return this.selectedField.field.getElementId();
  }
}
