import { FilterTypes } from 'src/app/model/FilterTypes';
import { AbstractQuantityFilter } from './AbstractQuantityFilter';

export class QuantityNotSet extends AbstractQuantityFilter {
  type: FilterTypes = FilterTypes.QUANTITY_NOT_SET;
}
