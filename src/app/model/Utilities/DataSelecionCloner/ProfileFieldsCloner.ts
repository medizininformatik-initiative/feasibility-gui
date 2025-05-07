import { BasicFieldCloner } from './ProfileFields/BasicFieldCloner';
import { ProfileFields } from '../../DataSelection/Profile/Fields/ProfileFields';
import { ReferenceFieldsCloner } from './ProfileFields/ReferenceFieldsCloner';
import { SelectedBasicFieldCloner } from './ProfileFields/SelectedFieldCloner';
import { SelectedReferenceFieldsCloner } from './ProfileFields/SelectedReferenceFieldsCloner';

export class ProfileFieldsCloner {
  /**
   * Clones an array of ProfileField objects deeply.
   * @param fields The array of ProfileField to clone.
   * @returns A deep copy of the ProfileField array.
   */
  public static deepCopyProfileFields(profileFields: ProfileFields): ProfileFields {
    const basicFields = BasicFieldCloner.deepCopyBasicFields(profileFields.getFieldTree());
    const selectedBasicFields = SelectedBasicFieldCloner.deepCopySelectedBasicFields(
      profileFields.getSelectedBasicFields()
    );
    const selectedReferenceFields = SelectedReferenceFieldsCloner.deepCopySelectedReferenceFields(
      profileFields.getSelectedReferenceFields()
    );
    const referenceFields = ReferenceFieldsCloner.deepCopyReferenceFields(
      profileFields.getReferenceFields()
    );

    return new ProfileFields(
      profileFields.getId(),
      basicFields,
      referenceFields,
      selectedBasicFields,
      selectedReferenceFields
    );
  }
}
