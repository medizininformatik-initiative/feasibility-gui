import { AbstractQuantityFilter } from '../AbstractQuantityFilter';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityUnit } from 'src/app/model/StructuredQuery/QuantityUnit';

export abstract class AbstractQuantityRangeFilter extends AbstractQuantityFilter {
  private minValue: number = null;
  private maxValue: number = null;
  protected type: FilterTypes = FilterTypes.QUANTITY_RANGE;

  constructor(minValue: number, maxValue: number, unit: QuantityUnit) {
    super(unit);
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  public getMinValue(): number {
    return this.minValue;
  }

  public setMinValue(minValue: number): void {
    this.minValue = minValue;
  }

  public getMaxValue(): number {
    return this.maxValue;
  }

  public setMaxValue(maxValue: number): void {
    this.maxValue = maxValue;
  }

  public getType(): FilterTypes {
    return this.type;
  }

  public setType(type: FilterTypes): void {
    this.type = type;
  }
}
