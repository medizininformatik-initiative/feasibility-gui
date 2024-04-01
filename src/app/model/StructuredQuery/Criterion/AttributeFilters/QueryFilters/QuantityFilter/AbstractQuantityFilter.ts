import { FilterTypes } from 'src/app/model/FilterTypes';
import { QuantityUnit } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { TerminologyCode } from 'src/app/modules/querybuilder/model/api/terminology/terminology';

export abstract class AbstractQuantityFilter extends AbstractStructuredQueryFilters {
  unit: QuantityUnit = new QuantityUnit();
  type: FilterTypes;
}
