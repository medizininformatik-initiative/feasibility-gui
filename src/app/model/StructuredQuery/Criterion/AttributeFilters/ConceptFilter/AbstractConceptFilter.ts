import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { FilterTypes } from 'src/app/model/Utilities/FilterTypes';
import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';

export class AbstractConceptFilter extends AbstractStructuredQueryFilters {
  selectedConcepts: TerminologyCode[] = [];
  type: FilterTypes = FilterTypes.CONCEPT;
}
