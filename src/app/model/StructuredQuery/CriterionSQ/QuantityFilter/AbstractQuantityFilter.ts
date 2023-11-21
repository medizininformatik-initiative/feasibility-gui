import {
  OperatorOptions,
  QuantityUnit,
} from '../../../FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';

export class AbstractQuantityFilter extends AbstractStructuredQueryFilters {
  unit: QuantityUnit = null;
  type: OperatorOptions;
}
