import { BasicField } from '../../DataSelection/Profile/Fields/BasicFields/BasicField';
import { ProfileFields } from '../../DataSelection/Profile/Fields/ProfileFields';
import { CloneDisplayData } from '../DisplayData/CloneDisplayData';

export class ProfileFieldsCloner {
  /**
   * Clones an array of ProfileField objects deeply.
   * @param fields The array of ProfileField to clone.
   * @returns A deep copy of the ProfileField array.
   */
  public static deepCopyProfileFields(profileFields: ProfileFields): ProfileFields {
    const basicFields = ProfileFieldsCloner.deepCopyFields(profileFields.getFieldTree());
    return new ProfileFields(
      profileFields.getId(),
      basicFields,
      profileFields.getReferenceFields(),
      profileFields.getSelectedBasicFields(),
      profileFields.getSelectedReferenceFields()
    );
  }

  public static deepCopyFields(fields: BasicField[]): BasicField[] {
    if (!fields || fields.length === 0) {
      return []; // Handle null, undefined, or empty arrays
    }

    return fields.map(
      (field) =>
        new BasicField(
          field.getElementId(), // Corrected method name
          CloneDisplayData.deepCopyDisplayData(field.getDisplay()), // Deep copy display
          CloneDisplayData.deepCopyDisplayData(field.getDescription()), // Deep copy description
          ProfileFieldsCloner.deepCopyFields(field.getChildren() || []), // Recursively clone children
          field.getRecommended(),
          field.getIsSelected(),
          field.getIsRequired(),
          field.getType()
        )
    );
  }
}
