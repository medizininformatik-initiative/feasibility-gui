import { AnnotatedStructuredQueryIssue } from '../AnnotatedStructuredQueryIssue';
import { StructuredQueryCriterion } from '../../StructuredQuery/Criterion/StructuredQueryCriterion';

/**
 * @todo we need default values for all class attributes
 */
export class AnnotatedStructuredQueryCriterion extends StructuredQueryCriterion {
  issues: AnnotatedStructuredQueryIssue[] = [];
}
