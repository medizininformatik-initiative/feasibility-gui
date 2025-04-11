import { CloneDisplayData } from 'src/app/model/Utilities/DisplayData/CloneDisplayData';
import { FilterChipBuilder } from '../../FilterChipBuilder';
import { InterfaceFilterChip } from '../../InterfaceFilterChip';
import { SelectedBasicField } from 'src/app/model/DataSelection/Profile/Fields/BasicFields/SelectedBasicField';

export class FilterChipDataSelectionAdapter {
  /**
   * @todo check if deep copy of field.getDisplay() is needed
   * @param fields
   * @returns
   */
  public static adaptFields(fields: SelectedBasicField[]): InterfaceFilterChip[] {
    const filterChips: InterfaceFilterChip[] = [];

    fields.forEach((field: SelectedBasicField) => {
      const type = field.getMustHave() ? 'DATASELECTION.REQUIRED' : 'DATASELECTION.OPTIONAL';
      const builder = new FilterChipBuilder(type);
      builder.addData(
        field.getElementId(),
        CloneDisplayData.deepCopyDisplayData(field.getDisplay())
      );
      filterChips.push(builder.buildFilterChip());
    });
    return filterChips;
  }
}
