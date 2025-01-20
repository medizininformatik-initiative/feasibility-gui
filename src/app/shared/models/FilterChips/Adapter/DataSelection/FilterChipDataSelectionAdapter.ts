import { CloneDisplayData } from 'src/app/model/Utilities/DisplayData/CloneDisplayData';
import { FilterChipBuilder } from '../../FilterChipBuilder';
import { InterfaceFilterChip } from '../../InterfaceFilterChip';
import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';

export class FilterChipDataSelectionAdapter {
  /**
   * @todo check if deep copy of field.getDisplay() is needed
   * @param fields
   * @returns
   */
  public static adaptFields(fields: ProfileFields[]): InterfaceFilterChip[] {
    const filterChips: InterfaceFilterChip[] = [];

    fields.forEach((field: ProfileFields) => {
      if (field.getIsSelected() || field.getIsRequired()) {
        const type = field.getMustHave() ? 'required' : 'optional';
        const builder = new FilterChipBuilder(type);

        builder.addData(field.getId(), CloneDisplayData.deepCopyDisplayData(field.getDisplay()));
        filterChips.push(builder.buildFilterChip());
      }

      if (field.getChildren().length > 0) {
        const childChips = FilterChipDataSelectionAdapter.adaptFields(field.getChildren());
        filterChips.push(...childChips);
      }
    });
    return filterChips;
  }
}
