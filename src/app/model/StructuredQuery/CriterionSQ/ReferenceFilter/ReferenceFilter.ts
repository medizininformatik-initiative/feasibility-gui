import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { StructuredQueryCriterion } from '../StructuredQueryCriterion';
import { TerminologyCode } from '../../../terminology/Terminology';
import { FilterTypes } from 'src/app/model/FilterTypes';

export class ReferenceFilter extends AbstractStructuredQueryFilters {
  attributeCode: TerminologyCode;
  criteria: StructuredQueryCriterion[] = [];
  type: FilterTypes.REFERENCE;
}
