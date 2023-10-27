import { FilterTypes } from 'src/app/model/FilterTypes';
import { TerminologyCode } from 'src/app/model/terminology/Terminology';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';

export class AbstractConceptFilter extends AbstractStructuredQueryFilters {
  selectedConcepts: TerminologyCode[] = [];
  type: FilterTypes = FilterTypes.CONCEPT;
}
