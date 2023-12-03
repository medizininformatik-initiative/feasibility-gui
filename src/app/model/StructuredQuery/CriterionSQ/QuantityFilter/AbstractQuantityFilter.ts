import { FilterTypes } from 'src/app/model/FilterTypes';
import { QuantityUnit } from '../../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';

export class AbstractQuantityFilter extends AbstractStructuredQueryFilters {
  unit: QuantityUnit = null;
  type: FilterTypes;
}
