import { SelectedReferenceField } from 'src/app/model/DataSelection/Profile/Fields/RefrenceFields/SelectedReferenceField';
import { ProfileReferenceChipData, ProfileReferenceGroup } from './ProfileReferenceChipData';
import { FilterChipBuilder } from './FilterChipBuilder';
import { Display } from 'src/app/model/DataSelection/Profile/Display';

export class FilterChipProfileRefrenceAdapter {
  public static adaptToProfileReferenceChipData(
    profileReferenceGroups: ProfileReferenceGroup[]
  ): ProfileReferenceChipData[] {
    return profileReferenceGroups.map((group) => {
      const builder = new FilterChipBuilder(group.elementId);

      group.profiles.forEach((profileDisplay) => {
        builder.addData('4', profileDisplay, false);
      });

      return builder.buildFilterChip() as ProfileReferenceChipData;
    });
  }
}
