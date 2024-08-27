import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { BeforeFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BeforeFilter';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { v4 as uuidv4 } from 'uuid';

export class FilterChipTimeRestrictionAdapter {
  public static adaptTimeRestriction(
    timeRestriction: AbstractTimeRestriction
  ): InterfaceFilterChip[] {
    const chips: InterfaceFilterChip[] = [];
    if (timeRestriction) {
      switch (timeRestriction.getType()) {
        case TimeRestrictionType.BETWEEN:
          chips.push(this.createBetweenChip(timeRestriction));
          break;
        case TimeRestrictionType.AT:
          chips.push(this.createAtChip(timeRestriction));
          break;
        case TimeRestrictionType.BEFORE:
          chips.push(this.createBeforeChip(timeRestriction as BeforeFilter));
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
    const betweenText = `From ${this.formatDate(
      timeRestriction.getBeforeDate()
    )} to ${this.formatDate(timeRestriction.getAfterDate())}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.BETWEEN);
    builder.addData(uuidv4(), betweenText);
    return builder.buildFilterChip();
  }

  private static createAtChip(timeRestriction: any): InterfaceFilterChip {
    const atText = `${this.formatDate(timeRestriction.getBeforeDate())}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.AT);
    builder.addData(uuidv4(), atText);
    return builder.buildFilterChip();
  }

  private static createBeforeChip(timeRestriction: BeforeFilter): InterfaceFilterChip {
    const beforeText = `${this.formatDate(timeRestriction.getAfterDate())}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.BEFORE);
    builder.addData(uuidv4(), beforeText);
    return builder.buildFilterChip();
  }

  private static createAfterChip(timeRestriction: any): InterfaceFilterChip {
    const afterText = `${this.formatDate(timeRestriction.getAfterDate())}`;
    const builder = new FilterChipBuilder(TimeRestrictionType.AFTER);
    builder.addData(uuidv4(), afterText);
    return builder.buildFilterChip();
  }

  public static formatDate(date: string) {
    const dateFormat = new Date(date);

    const day = String(dateFormat.getDate()).padStart(2, '0');
    const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
    const year = dateFormat.getFullYear();

    const dateStamp = `${day}.${month}.${year}`;
    return dateStamp;
  }
}
