import { AnnotatedStructuredQueryIssue } from '../AnnotatedStructuredQueryIssue';
import { StructuredQueryCriterion } from '../../StructuredQuery/Criterion/StructuredQueryCriterion';
import { TerminologyCode } from '../../Terminology/TerminologyCode';
import { AttributeFilter } from '../../FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { AbstractStructuredQueryFilters } from '../../StructuredQuery/Criterion/Abstract/AbstractStructuredQueryFilters';
import { AbstractTimeRestriction } from '../../StructuredQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { ValueFilter } from '../../FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';

/**
 * @todo we need default values for all class attributes
 */
export class AnnotatedStructuredQueryCriterion extends StructuredQueryCriterion {
  issues: AnnotatedStructuredQueryIssue[] = [];

  constructor(
    termCodes: TerminologyCode[],
    attributeFilters: AbstractStructuredQueryFilters[],
    context: TerminologyCode,
    timeRestriction: AbstractTimeRestriction,
    valueFilter: AbstractStructuredQueryFilters,
    issues: AnnotatedStructuredQueryIssue[]
  ) {
    super(termCodes, attributeFilters, context, timeRestriction, valueFilter);
    this.issues = issues;
  }

  public getIssues(): AnnotatedStructuredQueryIssue[] {
    return this.issues;
  }

  public setIssues(value: AnnotatedStructuredQueryIssue[]): void {
    this.issues = value;
  }
}
