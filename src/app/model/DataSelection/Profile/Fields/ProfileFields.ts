import { BasicField } from './BasicFields/BasicField';
import { ReferenceField } from './RefrenceFields/ReferenceField';
import { SelectedBasicField } from './BasicFields/SelectedBasicField';
import { SelectedReferenceField } from './RefrenceFields/SelectedReferenceField';

export class ProfileFields {
  private fieldTree: BasicField[] = [];
  private referenceFields: ReferenceField[] = [];
  private selectedFields: SelectedBasicField[] = [];
  private selectedReferenceFields: SelectedReferenceField[] = [];

  constructor(
    fieldTree: BasicField[],
    referenceFields: ReferenceField[],
    selectedFields: SelectedBasicField[],
    selectedReferenceFields: SelectedReferenceField[]
  ) {
    this.fieldTree = fieldTree;
    this.referenceFields = referenceFields;
    this.selectedFields = selectedFields;
    this.selectedReferenceFields = selectedReferenceFields;
  }

  public getFieldTree(): BasicField[] {
    return this.fieldTree;
  }

  public setFieldTree(fieldTree: BasicField[]): void {
    this.fieldTree = fieldTree;
  }

  public getReferenceFields(): ReferenceField[] {
    return this.referenceFields;
  }

  public setReferenceFields(referenceFields: ReferenceField[]): void {
    this.referenceFields = referenceFields;
  }

  public getSelectedFields(): SelectedBasicField[] {
    return this.selectedFields;
  }

  public setSelectedFields(selectedFields: SelectedBasicField[]): void {
    this.selectedFields = selectedFields;
  }

  public getSelectedReferenceFields(): SelectedReferenceField[] {
    return this.selectedReferenceFields;
  }

  public setSelectedReferenceFields(selectedReferenceFields: SelectedReferenceField[]): void {
    this.selectedReferenceFields = selectedReferenceFields;
  }

  public addField(field: BasicField): void {
    this.fieldTree.push(field);
  }
}
