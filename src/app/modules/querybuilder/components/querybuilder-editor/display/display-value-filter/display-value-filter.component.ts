import { Component, Input, OnInit } from '@angular/core'
import { Comparator, OperatorOptions, ValueFilter } from '../../../../model/api/query/valueFilter'
import { FeatureService } from '../../../../../../service/feature.service'

class ComperatorIcon {
  icon: string
  utf8: string
}

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

  constructor(public featureService: FeatureService) {}

  ngOnInit(): void {}

  getComparator(): ComperatorIcon {
    switch (this.filter.comparator) {
      case Comparator.EQUAL:
        return { icon: 'equals', utf8: '\u003d' }
      case Comparator.GREATER_THAN:
        return { icon: 'greater-than', utf8: '\u003e' }
      case Comparator.GREATER_OR_EQUAL:
        return { icon: 'greater-than-equal', utf8: '\u2265' }
      case Comparator.LESS_OR_EQUAL:
        return { icon: 'less-than-equal', utf8: '\u2264' }
      case Comparator.LESS_THAN:
        return { icon: 'less-than', utf8: '\u003c' }
      case Comparator.NOT_EQUAL:
        return { icon: 'not-equal', utf8: '\u2260' }
      default:
        return { icon: '', utf8: '' }
    }
  }
}
