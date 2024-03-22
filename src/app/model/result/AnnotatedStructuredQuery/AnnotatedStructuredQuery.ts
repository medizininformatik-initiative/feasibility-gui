import { AnnotatedStructuredQueryCriterion } from './AnnotatedCriterion/AnnotatedStructuredQueryCriterion';

/**
 * @todo define class for inner array of inclusioncriteria
 */
export class AnnotatedStructuredQuery {
  version = 'http://to_be_decided.com/draft-1/schema#';
  display = '';

  // conjunctive normal form (without negation)
  inclusionCriteria: AnnotatedStructuredQueryCriterion[][] = [];
  // disjunctive normal form (without negation)
  exclusionCriteria: AnnotatedStructuredQueryCriterion[][];
}
