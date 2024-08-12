import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { InterfaceFilterChip } from '../../InterfaceFilterChip';
import { FilterChipBuilder } from '../../FilterChipBuilder';

export class FilterChipDataSelectionAdapter {
  public static adaptFields(fields: DataSelectionProfileProfileNode): InterfaceFilterChip[] {
    const filterChips: InterfaceFilterChip[] = [];
    const builder = new FilterChipBuilder('required');
    builder.addData(fields.getId(), fields.getName());
    filterChips.push(builder.buildFilterChip());
    console.log(filterChips);
    return filterChips;
  }
}
