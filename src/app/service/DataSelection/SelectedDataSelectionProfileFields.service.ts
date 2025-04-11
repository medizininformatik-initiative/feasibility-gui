import { BasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/BasicField';
import { BehaviorSubject, Observable } from 'rxjs';
import { Display } from 'src/app/model/DataSelection/Profile/Display';
import { Injectable } from '@angular/core';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';

@Injectable({
  providedIn: 'root',
})
export class SelectedDataSelectionProfileFieldsService {
  private selectedFields = new BehaviorSubject<SelectedBasicField[]>([]);
  private deepCopyOfBasicFields = new BehaviorSubject<BasicField[]>([]);
  private fieldIds = new Set<string>();

  public updateSelectionStatus(
    BasicFields: BasicField[],
    selectedFields: SelectedBasicField[]
  ): void {
    const selectedElementIds = new Set(selectedFields.map((field) => field.getElementId()));

    const traverseAndUpdate = (fields: BasicField[]): void => {
      fields.forEach((field) => {
        if (selectedElementIds.has(field.getElementId())) {
          field.setIsSelected(true);
        } else {
          field.setIsSelected(false);
        }

        // Recursively traverse children
        if (field.getChildren().length > 0) {
          traverseAndUpdate(field.getChildren());
        }
      });
    };

    traverseAndUpdate(BasicFields);
  }

  public setDeepCopyFields(fields: BasicField[]): void {
    const deepCopy = this.deepCopyBasicFields(fields);
    this.deepCopyOfBasicFields.next(deepCopy);
  }

  private deepCopyBasicFields(fields: BasicField[]): BasicField[] {
    return fields.map((field) => this.mapNode(field));
  }

  private mapNode(basicField: BasicField): BasicField {
    const children = basicField.getChildren()
      ? this.deepCopyBasicFields(basicField.getChildren())
      : [];
    return new BasicField(
      basicField.getElementId(),
      this.instantiateDisplayData(basicField.getDisplay()),
      this.instantiateDisplayData(basicField.getDescription()),
      children,
      basicField.getRecommended(),
      basicField.getIsSelected(),
      basicField.getIsRequired(),
      basicField.getType()
    );
  }

  private instantiateDisplayData(displayData: Display): Display {
    return new Display(
      displayData
        .getTranslations()
        .map(
          (translation) =>
            new Translation(translation.getLanguage(), translation.getValue(), undefined)
        ),
      displayData.getOriginal()
    );
  }

  public getDeepCopyBasicFields(): Observable<BasicField[]> {
    return this.deepCopyOfBasicFields.asObservable();
  }

  public getSelectedFields(): Observable<SelectedBasicField[]> {
    return this.selectedFields.asObservable();
  }

  public setSelectedFields(fields: SelectedBasicField[]): void {
    this.selectedFields.next(fields);
    this.fieldIds.clear();
    //this.setSelectedChildrenFields(fields);
  }

  private setSelectedChildrenFields(fields: BasicField[]): void {
    fields.forEach((field) => {
      this.fieldIds.add(field.getElementId());
      this.setSelectedChildrenFields(field.getChildren());
    });
  }

  public addToSelection(field: SelectedBasicField): void {
    const currentSelection = this.selectedFields.getValue();
    if (!this.fieldIds.has(field.getElementId())) {
      this.selectedFields.next([...currentSelection, field]);
      this.fieldIds.add(field.getElementId());
      //this.updateDeepCopyField(field);
    }
  }

  public removeFromSelection(field: BasicField): void {
    const currentSelection = this.selectedFields.getValue();
    const updatedSelection = currentSelection.filter(
      (f) => f.getElementId() !== field.getElementId()
    );
    this.selectedFields.next(updatedSelection);
    this.fieldIds.delete(field.getElementId());
    this.updateDeepCopyField(field, false); // Mark as unselected
  }

  public updateField(field: BasicField): void {
    this.updateDeepCopyField(field);
  }

  private updateDeepCopyField(field: BasicField, isSelected = true): void {
    const deepCopy = this.deepCopyOfBasicFields.getValue();
    const updatedDeepCopy = this.updateNodeInDeepCopy(deepCopy, field, isSelected);
    this.deepCopyOfBasicFields.next(updatedDeepCopy);
  }

  private updateNodeInDeepCopy(
    fields: BasicField[],
    updatedField: BasicField,
    isSelected: boolean
  ): BasicField[] {
    return fields.map((field) => {
      if (field.getElementId() === updatedField.getElementId()) {
        field.setIsSelected(isSelected);
        return field;
      }
      if (field.getChildren()) {
        field.setChildren(this.updateNodeInDeepCopy(field.getChildren(), updatedField, isSelected));
      }
      return field;
    });
  }

  public getSelectedIds(): string[] {
    return Array.from(this.fieldIds);
  }

  public clearSelection(): void {
    this.selectedFields.next([]);
    this.fieldIds.clear();
    this.clearDeepCopySelection();
  }

  private clearDeepCopySelection(): void {
    const deepCopy = this.deepCopyOfBasicFields.getValue();
    const clearedDeepCopy = this.clearSelectionInDeepCopy(deepCopy);
    this.deepCopyOfBasicFields.next(clearedDeepCopy);
  }

  private clearSelectionInDeepCopy(fields: BasicField[]): BasicField[] {
    return fields.map((field) => {
      field.setIsSelected(false);
      if (field.getChildren()) {
        field.setChildren(this.clearSelectionInDeepCopy(field.getChildren()));
      }
      return field;
    });
  }
}
