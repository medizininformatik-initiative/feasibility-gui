import { Injectable } from '@angular/core';
import { PossibleProfileReferenceData } from '../model/Interface/PossibleProfileReferenceData';
import { ReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';

@Injectable({
  providedIn: 'root',
})
export class CreateSelectedReferenceService {
  constructor() {}

  /**
   * Maps possible references to selected reference fields.
   */
  public mapPossibleReferencesToSelectedReferences(
    possibleReferences: PossibleProfileReferenceData[],
    referenceField: ReferenceField
  ): SelectedReferenceField {
    const linkedProfileIds = possibleReferences
      .filter((reference) => reference.isSelected)
      .map((filteredReference) => filteredReference.id);

    return this.createSelectedReferenceFieldInstances(referenceField, linkedProfileIds);
  }

  /**
   * Creates selected reference field instances by mapping reference fields to profile IDs.
   */
  public createSelectedReferenceFieldInstances(
    referenceField: ReferenceField,
    linkedProfileIds: string[],
    mustHave: boolean = false
  ): SelectedReferenceField {
    return new SelectedReferenceField(referenceField, linkedProfileIds, mustHave);
  }
}
