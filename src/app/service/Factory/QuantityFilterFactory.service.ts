import { Injectable } from '@angular/core';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { QuantityComparatorFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityComparatorFilter';
import { QuantityComparisonOption } from 'src/app/model/Utilities/Quantity/QuantityFilterOptions';
import { QuantityNotSet } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityNotSet';
import { QuantityRangeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/QuantityRangeFilter';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/QuantityUnit';
import { AbstractQuantityFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Quantity/AbstractQuantityFilter';

@Injectable({
  providedIn: 'root',
})
export class QuantityFilterFactoryService {
  private precision: number;
  private quantityUnit: QuantityUnit;
  private allowedUnits: QuantityUnit[];

  constructor() {}

  public setPrecision(precision: number): void {
    this.precision = precision;
  }

  public setAllowedUnits(units: QuantityUnit[]): void {
    this.allowedUnits = units;
  }

  public setQuantityUnit(selectedUnit: QuantityUnit) {
    this.quantityUnit = selectedUnit;
  }

  public createQuantityComparatorFilter(
    value: number,
    comparator: QuantityComparisonOption
  ): QuantityComparatorFilter {
    return new QuantityComparatorFilter(
      this.quantityUnit,
      this.allowedUnits,
      this.precision,
      comparator,
      value
    );
  }

  public createQuantityRangeFilter(minValue: number, maxValue: number): QuantityRangeFilter {
    return new QuantityRangeFilter(
      this.quantityUnit,
      this.allowedUnits,
      this.precision,
      minValue,
      maxValue
    );
  }

  public createEmptyQuantityFilter(): QuantityNotSet {
    return new QuantityNotSet();
  }
}
