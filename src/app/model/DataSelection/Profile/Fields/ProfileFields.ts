import { ReferenceField } from './RefrenceFields/ReferenceField';
import { SelectedBasicField } from './BasicFields/SelectedBasicField';
import { SelectedReferenceField } from './RefrenceFields/SelectedReferenceField';
import { BasicField } from './BasicFields/BasicField';

export class ProfileFields {
  private readonly id: string;
  private fieldTree: BasicField[] = [];
  private referenceFields: ReferenceField[] = [];

  private selectedBasicFields: SelectedBasicField[] = [];
  private selectedReferenceFields: SelectedReferenceField[] = [];

  constructor(
    id: string,
    fieldTree: BasicField[] = [],
    referenceFields: ReferenceField[] = [],
    selectedBasicFields: SelectedBasicField[] = [],
    selectedReferenceFields: SelectedReferenceField[] = []
  ) {
    this.id = id;
    this.fieldTree = fieldTree;
    this.referenceFields = referenceFields;
    this.selectedBasicFields = selectedBasicFields;
    this.selectedReferenceFields = selectedReferenceFields;
  }

  public getFieldTree(): BasicField[] {
    return this.fieldTree;
  }

  public getReferenceFields(): ReferenceField[] {
    return this.referenceFields;
  }

  public setReferenceFields(referenceFields: ReferenceField[]): void {
    this.referenceFields = referenceFields;
  }

  public getSelectedBasicFields(): SelectedBasicField[] {
    return this.selectedBasicFields;
  }

  public getSelectedReferenceFields(): SelectedReferenceField[] {
    return this.selectedReferenceFields;
  }

  public setSelectedReferenceFields(selectedFields: SelectedReferenceField[]): void {
    this.selectedReferenceFields = selectedFields;
  }

  public setSelectedBasicFields(selectedFields: SelectedBasicField[]): void {
    this.selectedBasicFields = selectedFields;
  }

  public getId(): string {
    return this.id;
  }
}
