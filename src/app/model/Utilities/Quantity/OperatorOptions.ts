export enum OperatorOptions {
  CONCEPT = 'concept', // e.g. "weiblich, männlich"
  QUANTITY_COMPARATOR = 'quantity-comparator', // e.g. "< 27.10.2020"
  QUANTITY_NOT_SET = '',
  QUANTITY_RANGE = 'quantity-range', // e.g. ">= 27 and <= 30"
  REFERENCE = 'reference',
  TIMERESTRICTION = 'time-restriction',
}
