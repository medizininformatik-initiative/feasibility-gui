import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractStructuredQueryFilters } from '../AbstractStructuredQueryFilters';
import { TerminologyCode } from 'src/app/modules/querybuilder/model/api/terminology/terminology';
import { QuantityUnit } from 'src/app/model/QuantityUnit';

export abstract class AbstractQuantityFilter extends AbstractStructuredQueryFilters {
  unit: QuantityUnit;
  type: FilterTypes;
}
