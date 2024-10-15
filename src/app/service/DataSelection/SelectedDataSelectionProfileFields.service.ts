import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';

@Injectable({
  providedIn: 'root',
})
export class SelectedDataSelectionProfileFieldsService {
  private selectedFields = new BehaviorSubject<ProfileFields[]>([]);

  private fieldIds = new Set<string>();

  /**
   * Gets the selected profile fields as an observable.
   */
  public getSelectedFields(): Observable<ProfileFields[]> {
    return this.selectedFields.asObservable();
  }

  /**
   * Sets the selected fields and updates the internal ID set.
   *
   * @param fields The fields to be set.
   */
  public setSelectedFields(fields: ProfileFields[]): void {
    this.selectedFields.next(fields);
    this.fieldIds.clear();
    fields.forEach((field) => this.fieldIds.add(field.getId()));
  }

  /**
   * Adds a field to the current selection if it is not already included.
   *
   * @param field The field to be added to the selection.
   */
  public addToSelection(field: ProfileFields): void {
    const currentSelection = this.selectedFields.getValue();
    if (!this.fieldIds.has(field.getId())) {
      this.selectedFields.next([...currentSelection, field]);
      this.fieldIds.add(field.getId());
    }
  }

  /**
   * Gets the IDs of all selected fields.
   *
   * @returns An array of IDs.
   */
  public getSelectedIds(): string[] {
    return Array.from(this.fieldIds);
  }

  /**
   * Removes a field from the current selection.
   *
   * @param field The field to be removed from the selection.
   */
  public removeFromSelection(field: ProfileFields): void {
    const currentSelection = this.selectedFields.getValue();
    const updatedSelection = currentSelection.filter((f) => f.getId() !== field.getId());
    this.selectedFields.next(updatedSelection);
    this.fieldIds.delete(field.getId());
  }

  /**
   * Clears the current selection of all fields.
   */
  public clearSelection(): void {
    this.selectedFields.next([]);
    this.fieldIds.clear();
  }
}
