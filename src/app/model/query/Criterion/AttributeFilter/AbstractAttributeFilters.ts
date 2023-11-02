import { TerminologyCode } from '../../../terminology/Terminology';

export abstract class AbstractAttributeFilters {
  type: OperatorOptions = OperatorOptions.QUANTITY_NOT_SET;
  display: string;

  // QUANTITY_COMPARATOR & QUANTITY_RANGE
  unit: QuantityUnit = null;

  precision: number = null;

  min: number = null;

  max: number = null;

  // QUANTITY_COMPARATOR
  value: number = null;
  comparator: Comparator = Comparator.NONE;

  // QUANTITY_RANGE
  minValue: number = null;
  maxValue: number = null;

  // CONCEPT
  selectedConcepts: TerminologyCode[] = [];
}

export class QuantityUnit {
  // UCUM
  code: string;
  display: string;
}

export enum Comparator {
  NONE = 'none',
  EQUAL = 'eq',
  NOT_EQUAL = 'ne',
  LESS_OR_EQUAL = 'le',
  LESS_THAN = 'lt',
  GREATER_OR_EQUAL = 'ge',
  GREATER_THAN = 'gt',
}

export enum OperatorOptions {
  QUANTITY_COMPARATOR = 'quantity-comparator', // e.g. "< 27.10.2020"
  QUANTITY_RANGE = 'quantity-range', // e.g. ">= 27 and <= 30"
  CONCEPT = 'concept', // e.g. "weiblich, männlich"
  REFERENCE = 'reference',
  QUANTITY_NOT_SET = '',
}
