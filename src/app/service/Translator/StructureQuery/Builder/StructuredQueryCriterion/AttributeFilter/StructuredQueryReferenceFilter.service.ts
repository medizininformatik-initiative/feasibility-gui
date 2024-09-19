import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { ReferenceFilter as ReferenceFilterFQ } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { ReferenceFilter as ReferenceFilterSQ } from 'src/app/model/StructuredQuery/Criterion/AttributeFilters/ReferenceFilter/ReferenceFilter';
import { StructuredQueryCriterion } from 'src/app/model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { StructuredQueryCriterionService } from '../StructuredQueryCriterion.service';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class StructuredQueryReferenceFilterService {
  constructor(private structuredQueryCriterionService: StructuredQueryCriterionService) {}

  public createReferenceFilter(
    attributeCode: TerminologyCode,
    referenceFilter: ReferenceFilterFQ
  ): ReferenceFilterSQ {
    return ReferenceFilterSQ.createFilter(
      attributeCode,
      this.buildLinkedCriteria(referenceFilter.getSelectedReferences())
    );
  }

  private buildLinkedCriteria(linkedCriteria: Criterion[]): StructuredQueryCriterion[] {
    return linkedCriteria.map((criterion) =>
      this.structuredQueryCriterionService.buildStructuredQueryCriterion(criterion)
    );
  }
}
