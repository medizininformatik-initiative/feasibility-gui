import { AbstractStructuredQueryFilter } from './AbstractStructuredQueryFilter';

export class QuantityRangeFilter extends AbstractStructuredQueryFilter {
  minValue: number = null;
  maxValue: number = null;
}
