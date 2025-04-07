import { ProfileFields } from '../../DataSelection/Profile/Fields/ProfileFields';
import { CloneDisplayData } from '../DisplayData/CloneDisplayData';

export class ProfileFieldsCloner {
  /**
   * Clones an array of ProfileFields objects deeply.
   * @param fields The array of ProfileFields to clone.
   * @returns A deep copy of the ProfileFields array.
   */
  public static deepCopyFields(fields: ProfileFields[]): ProfileFields[] {
    if (!fields || fields.length === 0) {
      return []; // Handle null, undefined, or empty arrays
    }

    return fields.map((field) => new ProfileFields(
        field.getElementId(), // Corrected method name
        CloneDisplayData.deepCopyDisplayData(field.getDisplay()), // Deep copy display
        CloneDisplayData.deepCopyDisplayData(field.getDescription()), // Deep copy description
        ProfileFieldsCloner.deepCopyFields(field.getChildren() || []), // Recursively clone children
        field.getIsSelected(),
        field.getIsRequired(),
        field.getRecommended(),
        [...(field.getReferencedProfileUrls() || [])] // Clone referencedProfileUrls array
      ));
  }
}
