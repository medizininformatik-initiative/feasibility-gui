import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { QuantityUnit } from 'src/app/model/StructuredQuery/QuantityUnit';

export abstract class AbstractQuantityFilter extends AbstractStructuredQueryFilters {
  unit: QuantityUnit;
  type: FilterTypes;

  setUnit(unit: QuantityUnit) {
    this.unit = unit;
  }

  getUnit() {
    return this.unit;
  }
}
