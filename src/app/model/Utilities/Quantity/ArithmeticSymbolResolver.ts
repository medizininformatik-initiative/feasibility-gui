import { QuantityComparisonOption } from './QuantityFilterOptions';

export const getArithmeticSymbol = (option: QuantityComparisonOption): string => {
  switch (option) {
    case QuantityComparisonOption.EQUAL:
      return '=';
    case QuantityComparisonOption.LESS_THAN:
      return '<';
    case QuantityComparisonOption.GREATER_THAN:
      return '>';
    case QuantityComparisonOption.BETWEEN:
      return '-';
    case QuantityComparisonOption.NONE:
    default:
      return '';
  }
};
