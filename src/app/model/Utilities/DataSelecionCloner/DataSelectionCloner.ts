import { DataSelectionProfile } from '../../DataSelection/Profile/DataSelectionProfile';
import { ProfileFieldsCloner } from './ProfileFieldsCloner';
import { ProfileFilterCloner } from './ProfileFilterCloner';
import { SelectedFieldCloner } from './SelectedFieldCloner';

export class DataSelectionCloner {
  /**
   * Clones a DataSelectionProfile object.
   * @param profile The DataSelectionProfile to clone.
   * @returns A deep copy of the DataSelectionProfile.
   */
  public static deepCopyProfile(profile: DataSelectionProfile): DataSelectionProfile {
    const clonedFields = ProfileFieldsCloner.deepCopyFields(profile.getFields());
    const clonedFilters = ProfileFilterCloner.deepCopyFilters(profile.getFilters());
    const clonedSelectedFields = SelectedFieldCloner.deepCopySelectedFields(
      profile.getSelectedFields()
    );

    return new DataSelectionProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      clonedFields,
      clonedFilters,
      profile.getReference(),
      clonedSelectedFields
    );
  }
}
