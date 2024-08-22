import { TerminologyCode } from 'src/app/model/Terminology/TerminologyCode';
import { FilterTypes } from '../../../Utilities/FilterTypes';

export abstract class AbstractStructuredQueryFilters {
  attributeCode: TerminologyCode;
  type: FilterTypes;
}
