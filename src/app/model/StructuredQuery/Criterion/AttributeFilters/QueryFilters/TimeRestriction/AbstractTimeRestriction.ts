import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';

/**
 * @todo make sure that type doesnt appear in timeRestriction in the AnnotatedStructuredQuery
 */
export abstract class AbstractTimeRestriction extends AbstractStructuredQueryFilters {
  beforeDate?: string;
  afterDate?: string;
}
