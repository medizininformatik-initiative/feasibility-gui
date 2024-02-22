/**
 * @todo We need to define a main type for Quantity which holds QUANTITY_COMPARATOR, QUANTITY_NOT_SET, QUANTITY_RANGE
 */
export enum FilterTypes {
  CONCEPT = 'concept', // e.g. "weiblich, männlich"
  QUANTITY = 'quantity',
  QUANTITY_COMPARATOR = 'quantity-comparator', // e.g. "< 27.10.2020"
  QUANTITY_NOT_SET = '',
  QUANTITY_RANGE = 'quantity-range', // e.g. ">= 27 and <= 30"
  REFERENCE = 'reference',
  TIMERESTRICTION = 'time-restriction',
}
