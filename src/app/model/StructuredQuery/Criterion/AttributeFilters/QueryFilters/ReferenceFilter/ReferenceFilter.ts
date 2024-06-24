import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { FilterTypes } from 'src/app/model/FilterTypes';
import { StructuredQueryCriterion } from '../../../StructuredQueryCriterion';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class ReferenceFilter extends AbstractStructuredQueryFilters {
  attributeCode: TerminologyCode;
  criteria: StructuredQueryCriterion[] = [];
  type: FilterTypes = FilterTypes.REFERENCE;
}
