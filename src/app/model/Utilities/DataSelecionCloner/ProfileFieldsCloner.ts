import { BasicField } from '../../DataSelection/Profile/Fields/BasicFields/BasicField';
import { ProfileFields } from '../../DataSelection/Profile/Fields/ProfileFields';
import { CloneDisplayData } from '../DisplayData/CloneDisplayData';
import { SelectedFieldCloner } from './SelectedFieldCloner';

export class ProfileFieldsCloner {
  /**
   * Clones an array of ProfileField objects deeply.
   * @param fields The array of ProfileField to clone.
   * @returns A deep copy of the ProfileField array.
   */
  public static deepCopyProfileFields(profileFields: ProfileFields): ProfileFields {
    const basicFields = ProfileFieldsCloner.deepCopyFields(profileFields.getFieldTree());
    const selectedBasicFields = SelectedFieldCloner.deepCopySelectedFields(
      profileFields.getSelectedBasicFields()
    );

    return new ProfileFields(
      profileFields.getId(),
      basicFields,
      profileFields.getReferenceFields(),
      selectedBasicFields
    );
  }

  public static deepCopyFields(fields: BasicField[]): BasicField[] {
    if (!fields || fields.length === 0) {
      return [];
    }

    return fields.map((field) => ProfileFieldsCloner.deepCopyField(field));
  }

  public static deepCopyField(basicField: BasicField) {
    return new BasicField(
      basicField.getElementId(), // Corrected method name
      CloneDisplayData.deepCopyDisplayData(basicField.getDisplay()), // Deep copy display
      CloneDisplayData.deepCopyDisplayData(basicField.getDescription()), // Deep copy description
      ProfileFieldsCloner.deepCopyFields(basicField.getChildren() || []), // Recursively clone children
      basicField.getRecommended(),
      basicField.getIsSelected(),
      basicField.getIsRequired(),
      basicField.getType()
    );
  }
}
