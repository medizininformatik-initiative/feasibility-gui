import { FilterTypes } from 'src/app/model/FilterTypes';
import { TerminologyCode } from '../../../terminology/Terminology';

export abstract class AbstractAttributeFilters {
  type: FilterTypes = FilterTypes.QUANTITY_NOT_SET;
  display: string;

  // QUANTITY_COMPARATOR & QUANTITY_RANGE
  unit?: QuantityUnit = null;

  precision?: number = null;

  min?: number = null;

  max?: number = null;

  optional = false;

  // QUANTITY_COMPARATOR
  value?: number = null;
  comparator?: Comparator = Comparator.NONE;

  // QUANTITY_RANGE
  minValue?: number = null;
  maxValue?: number = null;

  // CONCEPT
  selectedConcepts?: TerminologyCode[] = [];
}

export class QuantityUnit {
  // UCUM
  code = '';
  display = '';
}

export enum Comparator {
  NONE = 'none',
  EQUAL = 'eq',
  BETWEEN = 'bw',
  NOT_EQUAL = 'ne',
  LESS_OR_EQUAL = 'le',
  LESS_THAN = 'lt',
  GREATER_OR_EQUAL = 'ge',
  GREATER_THAN = 'gt',
}

/**
 * @todo new OperatorOptions value timerestriction --> needs to be tested
 */
export enum OperatorOptions {
  CONCEPT = 'concept', // e.g. "weiblich, männlich"
  QUANTITY_COMPARATOR = 'quantity-comparator', // e.g. "< 27.10.2020"
  QUANTITY_NOT_SET = '',
  QUANTITY_RANGE = 'quantity-range', // e.g. ">= 27 and <= 30"
  REFERENCE = 'reference',
  TIMERESTRICTION = 'time-restriction',
}
