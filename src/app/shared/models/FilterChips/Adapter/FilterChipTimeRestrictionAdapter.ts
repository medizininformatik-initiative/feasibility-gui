import { AbstractTimeRestriction } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { BeforeFilter } from 'src/app/model/FeasibilityQuery/Criterion/TimeRestriction/BeforeFilter';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';
import { FilterChipBuilder } from '../FilterChipBuilder';
import { InterfaceFilterChip } from '../InterfaceFilterChip';
import { TimeRestrictionType } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { Translation } from 'src/app/model/DataSelection/Profile/Translation';
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
    const betweenText = this.createDisplayDataInstanceForBetweenFilter(timeRestriction);
    const builder = new FilterChipBuilder('QUERYBUILDER.EDIT.TIMERESTRICTION.BETWEEN');
    builder.addData(uuidv4(), betweenText);
    return builder.buildFilterChip();
  }

  private static createAtChip(timeRestriction: any): InterfaceFilterChip {
    const atText = this.createDisplayDataInstance(
      `${this.formatDate(timeRestriction.getBeforeDate())}`
    );
    const builder = new FilterChipBuilder('QUERYBUILDER.EDIT.TIMERESTRICTION.AT');
    builder.addData(uuidv4(), atText);
    return builder.buildFilterChip();
  }

  private static createBeforeChip(timeRestriction: BeforeFilter): InterfaceFilterChip {
    const beforeText = this.createDisplayDataInstance(
      `${this.formatDate(timeRestriction.getAfterDate())}`
    );
    const builder = new FilterChipBuilder('QUERYBUILDER.EDIT.TIMERESTRICTION.BEFORE');
    builder.addData(uuidv4(), beforeText);
    return builder.buildFilterChip();
  }

  private static createAfterChip(timeRestriction: any): InterfaceFilterChip {
    const afterText = this.createDisplayDataInstance(
      `${this.formatDate(timeRestriction.getAfterDate())}`
    );
    const builder = new FilterChipBuilder('QUERYBUILDER.EDIT.TIMERESTRICTION.AFTER');
    builder.addData(uuidv4(), afterText);
    return builder.buildFilterChip();
  }

  public static formatDate(date: string): string {
    const dateFormat = new Date(date);

    const day = String(dateFormat.getDate()).padStart(2, '0');
    const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
    const year = dateFormat.getFullYear();

    const dateStamp = `${day}.${month}.${year}`;
    return dateStamp;
  }

  private static createDisplayDataInstance(text: string) {
    const german = 'de-DE';
    const english = 'en-US';
    return new DisplayData([new Translation(german, text), new Translation(english, text)], text);
  }

  /**
   * @todo Das muss dringend in die Trannslation json, lediglich ein Hotfix
   * @param timeRestriction
   * @returns
   */
  private static createDisplayDataInstanceForBetweenFilter(timeRestriction) {
    const german = 'de-DE';
    const english = 'en-US';
    const englishText = `From ${this.formatDate(
      timeRestriction.getAfterDate()
    )} to ${this.formatDate(timeRestriction.getBeforeDate())}`;

    const germanText = `Von ${this.formatDate(
      timeRestriction.getAfterDate()
    )} bis ${this.formatDate(timeRestriction.getBeforeDate())}`;

    return new DisplayData(
      [new Translation(german, germanText), new Translation(english, englishText)],
      germanText
    );
  }
}
