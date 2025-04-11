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
    const clonedFields = ProfileFieldsCloner.deepCopyProfileFields(profile.getProfileFields());
    const clonedFilters = ProfileFilterCloner.deepCopyFilters(profile.getFilters());
    const clonedSelectedFields = SelectedFieldCloner.deepCopySelectedFields(
      profile.getProfileFields().getSelectedBasicFields()
    );

    const profileFields = profile.getProfileFields();

    return new DataSelectionProfile(
      profile.getId(),
      profile.getUrl(),
      profile.getDisplay(),
      profileFields,
      clonedFilters,
      profile.getReference()
    );
  }
}
