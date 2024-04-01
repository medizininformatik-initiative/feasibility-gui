import { TerminologyCode } from 'src/app/model/terminology/Terminology';
import { FilterTypes } from '../../../../FilterTypes';

export abstract class AbstractStructuredQueryFilters {
  attributeCode: TerminologyCode;
  type: FilterTypes;
}
