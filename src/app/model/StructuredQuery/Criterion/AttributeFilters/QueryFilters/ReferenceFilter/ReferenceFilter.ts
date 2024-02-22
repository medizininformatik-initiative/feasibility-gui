import { FilterTypes } from 'src/app/model/FilterTypes';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';
import { StructuredQueryCriterion } from '../../../StructuredQueryCriterion';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';

export class ReferenceFilter extends AbstractStructuredQueryFilters {
  attributeCode: TerminologyCode;
  criteria: StructuredQueryCriterion[] = [];
  type: FilterTypes = FilterTypes.REFERENCE;
}
