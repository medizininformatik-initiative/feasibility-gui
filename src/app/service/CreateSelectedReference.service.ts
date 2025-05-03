import { Injectable } from '@angular/core';
import { ReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/ReferenceField';
import { SelectedReferenceField } from '../model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';

@Injectable({
  providedIn: 'root',
})
export class CreateSelectedReferenceService {
  constructor() {}

  /**
   * Creates selected reference field instances by mapping reference fields to profile IDs.
   */
  public createSelectedReferenceFieldInstances(
    referenceField: ReferenceField,
    getLinkedProfileIds: string[],
    mustHave: boolean = false
  ): SelectedReferenceField {
    return new SelectedReferenceField(referenceField, getLinkedProfileIds, mustHave);
  }
}
