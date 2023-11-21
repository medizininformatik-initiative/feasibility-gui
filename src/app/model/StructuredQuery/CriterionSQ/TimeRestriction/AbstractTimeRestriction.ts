import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { OperatorOptions } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AbstractAttributeFilters';

/**
 * @todo make sure that type doesnt appear in timeRestriction in the StructuredQuery
 */
export abstract class AbstractTimeRestriction extends AbstractStructuredQueryFilters {
  type: OperatorOptions.TIMERESTRICTION;
}
