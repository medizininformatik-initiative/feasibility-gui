import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
import { Display } from 'src/app/model/DataSelection/Profile/Display';

@Injectable({
  providedIn: 'root',
})
export class SelectedDataSelectionProfileFieldsService {
  private selectedFields = new BehaviorSubject<ProfileFields[]>([]);
  private deepCopyOfProfileFields = new BehaviorSubject<ProfileFields[]>([]);
  private fieldIds = new Set<string>();

  public setDeepCopyFields(fields: ProfileFields[]): void {
    const deepCopy = this.deepCopyProfileFields(fields);
    this.deepCopyOfProfileFields.next(deepCopy);
  }

  private deepCopyProfileFields(fields: ProfileFields[]): ProfileFields[] {
    return fields.map((field) => this.mapNode(field));
  }

  private mapNode(profileField: ProfileFields): ProfileFields {
    const children = profileField.getChildren()
      ? this.deepCopyProfileFields(profileField.getChildren())
      : [];
    return new ProfileFields(
      profileField.getElementId(),
      this.instantiateDisplayData(profileField.getDisplay()),
      this.instantiateDisplayData(profileField.getDescription()),
      children,
      profileField.getIsSelected(),
      profileField.getIsRequired(),
      profileField.getRecommended(),
      profileField.getReferencedProfileUrls()
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

  public getDeepCopyProfileFields(): Observable<ProfileFields[]> {
    return this.deepCopyOfProfileFields.asObservable();
  }

  public getSelectedFields(): Observable<ProfileFields[]> {
    return this.selectedFields.asObservable();
  }

  public setSelectedFields(fields: ProfileFields[]): void {
    this.selectedFields.next(fields);
    this.fieldIds.clear();
    this.setSelectedChildrenFields(fields);
  }

  private setSelectedChildrenFields(fields: ProfileFields[]): void {
    fields.forEach((field) => {
      this.fieldIds.add(field.getElementId());
      this.setSelectedChildrenFields(field.getChildren());
    });
  }

  public addToSelection(field: ProfileFields): void {
    const currentSelection = this.selectedFields.getValue();
    if (!this.fieldIds.has(field.getElementId())) {
      this.selectedFields.next([...currentSelection, field]);
      this.fieldIds.add(field.getElementId());
      this.updateDeepCopyField(field);
    }
  }

  public removeFromSelection(field: ProfileFields): void {
    const currentSelection = this.selectedFields.getValue();
    const updatedSelection = currentSelection.filter(
      (f) => f.getElementId() !== field.getElementId()
    );
    this.selectedFields.next(updatedSelection);
    this.fieldIds.delete(field.getElementId());
    this.updateDeepCopyField(field, false); // Mark as unselected
  }

  public updateField(field: ProfileFields): void {
    this.updateDeepCopyField(field);
  }

  private updateDeepCopyField(field: ProfileFields, isSelected = true): void {
    const deepCopy = this.deepCopyOfProfileFields.getValue();
    const updatedDeepCopy = this.updateNodeInDeepCopy(deepCopy, field, isSelected);
    this.deepCopyOfProfileFields.next(updatedDeepCopy);
  }

  private updateNodeInDeepCopy(
    fields: ProfileFields[],
    updatedField: ProfileFields,
    isSelected: boolean
  ): ProfileFields[] {
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
    const deepCopy = this.deepCopyOfProfileFields.getValue();
    const clearedDeepCopy = this.clearSelectionInDeepCopy(deepCopy);
    this.deepCopyOfProfileFields.next(clearedDeepCopy);
  }

  private clearSelectionInDeepCopy(fields: ProfileFields[]): ProfileFields[] {
    return fields.map((field) => {
      field.setIsSelected(false);
      if (field.getChildren()) {
        field.setChildren(this.clearSelectionInDeepCopy(field.getChildren()));
      }
      return field;
    });
  }
}
