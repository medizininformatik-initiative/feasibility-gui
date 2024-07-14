import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { TerminologyCode } from 'src/app/modules/querybuilder/model/api/terminology/terminology';
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
