import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { v4 as uuidv4 } from 'uuid';
import { FilterChipBuilder } from '../FilterChipBuilder';

export class FilterChipTimeRestrictionAdapter {
  public static adaptTimeRestriction(criterion: Criterion): InterfaceFilterChip[] {
    const chips: InterfaceFilterChip[] = [];
    const timeRestriction = criterion.getTimeRestriction();

    if (timeRestriction) {
      switch (timeRestriction.getType()) {
        case TimeRestrictionType.BETWEEN:
          chips.push(this.createBetweenChip(timeRestriction));
          break;
        case TimeRestrictionType.AT:
          chips.push(this.createAtChip(timeRestriction));
          break;
        case TimeRestrictionType.BEFORE:
          chips.push(this.createBeforeChip(timeRestriction));
          break;
        case TimeRestrictionType.AFTER:
          chips.push(this.createAfterChip(timeRestriction));
          break;
        default:
          console.warn('Unsupported time restriction type:', timeRestriction.getType());
          break;
      }
    }
    return chips;
  }

  private static createBetweenChip(timeRestriction: any): InterfaceFilterChip {
    const betweenText = `From ${timeRestriction.getBeforeDate()} to ${timeRestriction.getAfterDate()}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.BETWEEN);
    builder.addData(uuidv4(), betweenText);
    return builder.buildFilterChip();
  }

  private static createAtChip(timeRestriction: any): InterfaceFilterChip {
    const atText = `At ${timeRestriction.getBeforeDate()}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.AT);
    builder.addData(uuidv4(), atText);
    return builder.buildFilterChip();
  }

  private static createBeforeChip(timeRestriction: any): InterfaceFilterChip {
    const beforeText = `Before ${timeRestriction.getBeforeDate()}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.BEFORE);
    builder.addData(uuidv4(), beforeText);
    return builder.buildFilterChip();
  }

  private static createAfterChip(timeRestriction: any): InterfaceFilterChip {
    const afterText = `After ${timeRestriction.getAfterDate()}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.AFTER);
    builder.addData(uuidv4(), afterText);
    return builder.buildFilterChip();
  }
}
