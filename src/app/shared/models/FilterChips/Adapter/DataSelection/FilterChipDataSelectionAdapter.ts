import { ProfileFields } from 'src/app/model/DataSelection/Profile/Fields/ProfileFields';
import { FilterChipBuilder } from '../../FilterChipBuilder';
import { InterfaceFilterChip } from '../../InterfaceFilterChip';

export class FilterChipDataSelectionAdapter {
  public static adaptFields(fields: ProfileFields[]): InterfaceFilterChip[] {
    const filterChips: InterfaceFilterChip[] = [];

    fields.forEach((field) => {
      if (field.getIsSelected()) {
        const type = field.getIsRequired() ? 'required' : 'optional';
        const builder = new FilterChipBuilder(type);
        builder.addData(field.getId(), field.getName());
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
