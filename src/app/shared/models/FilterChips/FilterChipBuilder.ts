import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { InterfaceFilterChip } from './InterfaceFilterChip';
import { InterfaceFilterChipData } from './InterfaceFilterChipData';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

export class FilterChipBuilder {
  private type: FilterTypes | TimeRestrictionType | string | DisplayData;
  private data: InterfaceFilterChipData[] = [];

  constructor(type: FilterTypes | TimeRestrictionType | string | DisplayData) {
    this.type = type;
  }

  public addData(id: string, text: any, expanded: boolean = false): this {
    this.data.push({ id, text, expanded });
    return this;
  }

  public buildFilterChip(): InterfaceFilterChip {
    return {
      type: this.type,
      data: this.data,
    };
  }
}
