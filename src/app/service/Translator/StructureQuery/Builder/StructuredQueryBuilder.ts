import { AbstractStructuredQueryFilters } from 'src/app/model/StructuredQuery/Criterion/Abstract/AbstractStructuredQueryFilters';
import { StructuredQueryCriterion } from 'src/app/model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { AbstractTimeRestriction } from 'src/app/model/StructuredQuery/Criterion/TimeRestriction/AbstractTimeRestriction';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class StructuredQueryCriterionBuilder {
  private termCodes: Array<TerminologyCode> = [];
  private attributeFilters?: Array<AbstractStructuredQueryFilters>;
  private context?: TerminologyCode;
  private timeRestriction?: AbstractTimeRestriction;
  private valueFilter?: AbstractStructuredQueryFilters;

  public withTermCodes(termCodes: Array<TerminologyCode>): StructuredQueryCriterionBuilder {
    this.termCodes = termCodes;
    return this;
  }

  public withAttributeFilters(
    attributeFilters: Array<AbstractStructuredQueryFilters>
  ): StructuredQueryCriterionBuilder {
    this.attributeFilters = attributeFilters;
    return this;
  }

  public withContext(context: TerminologyCode): StructuredQueryCriterionBuilder {
    this.context = context;
    return this;
  }

  public withTimeRestriction(
    timeRestriction: AbstractTimeRestriction
  ): StructuredQueryCriterionBuilder {
    this.timeRestriction = timeRestriction;
    return this;
  }

  public withValueFilter(
    valueFilter: AbstractStructuredQueryFilters
  ): StructuredQueryCriterionBuilder {
    this.valueFilter = valueFilter;
    return this;
  }

  public build(): StructuredQueryCriterion {
    return new StructuredQueryCriterion(
      this.termCodes,
      this.attributeFilters,
      this.context,
      this.timeRestriction,
      this.valueFilter
    );
  }
}
