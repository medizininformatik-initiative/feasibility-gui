import { Component, Input, OnInit } from '@angular/core'
import { Comparator, OperatorOptions, ValueFilter } from '../../../../model/api/query/valueFilter'

@Component({
  selector: 'num-display-value-filter',
  templateUrl: './display-value-filter.component.html',
  styleUrls: ['./display-value-filter.component.scss'],
})
export class DisplayValueFilterComponent implements OnInit {
  @Input()
  filter: ValueFilter
  CONCEPT = OperatorOptions.CONCEPT
  QUANTITY_COMPARATOR = OperatorOptions.QUANTITY_COMPARATOR
  QUANTITY_RANGE = OperatorOptions.QUANTITY_RANGE

  constructor() {}

  ngOnInit(): void {}

  getComparator(): string {
    switch (this.filter.comparator) {
      case Comparator.EQUAL:
        return '='
      case Comparator.GREATER_THAN:
        return '>'
      // TODO: Use UTF-8 characters      case Comparator.GREATER_OR_EQUAL: return utf8Encode('\u2265');
      case Comparator.GREATER_OR_EQUAL:
        return '>='
      case Comparator.LESS_OR_EQUAL:
        return '<='
      case Comparator.LESS_THAN:
        return '<'
      case Comparator.NOT_EQUAL:
        return '<>'
      default:
        return '##'
    }
  }
}
