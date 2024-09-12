import { StructuredQueryCriterion } from './Criterion/StructuredQueryCriterion';

/**
 * @todo define class for inner array of inclusioncriteria
 */
export class StructuredQuery {
  version = 'http://to_be_decided.com/draft-1/schema#';
  display = '';

  inclusionCriteria: StructuredQueryCriterion[][] = [];
  exclusionCriteria: StructuredQueryCriterion[][];
}
