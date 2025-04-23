import { BasicFieldsCloner } from './ProfileFields/BasicFieldCloner';
import { ProfileFields } from '../../DataSelection/Profile/Fields/ProfileFields';
import { SelectedFieldCloner } from './SelectedFieldCloner';
import { SelectedReferenceFieldsCloner } from './ProfileFields/SelectedReferenceFieldsCloner';
import { ReferenceFieldsCloner } from './ProfileFields/ReferenceFieldsCloner';

export class ProfileFieldsCloner {
  /**
   * Clones an array of ProfileField objects deeply.
   * @param fields The array of ProfileField to clone.
   * @returns A deep copy of the ProfileField array.
   */
  public static deepCopyProfileFields(profileFields: ProfileFields): ProfileFields {
    const basicFields = BasicFieldsCloner.deepCopyBasicFields(profileFields.getFieldTree());
    const selectedBasicFields = SelectedFieldCloner.deepCopySelectedFields(
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
