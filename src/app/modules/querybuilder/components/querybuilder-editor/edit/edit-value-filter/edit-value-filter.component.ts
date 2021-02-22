import { Component, Input, OnInit } from '@angular/core'
import {
  Comparator,
  OperatorOptions,
  QuantityUnit,
  ValueFilter,
} from '../../../../model/api/query/valueFilter'
import { TerminologyCode, TerminologyEntry } from '../../../../model/api/terminology/terminology'

@Component({
  selector: 'num-edit-value-definition',
  templateUrl: './edit-value-filter.component.html',
  styleUrls: ['./edit-value-filter.component.scss'],
})
export class EditValueFilterComponent implements OnInit {
  @Input()
  filter: ValueFilter

  @Input()
  termEntry: TerminologyEntry

  QUANTITY_RANGE = OperatorOptions.QUANTITY_RANGE
  QUANTITY_COMPARATOR = OperatorOptions.QUANTITY_COMPARATOR
  CONCEPT = OperatorOptions.CONCEPT

  selectedUnit: QuantityUnit
  selectedMap: Map<TerminologyCode, boolean> = new Map()
  quantityFilterOption: string
  // TODO: Try using enum
  quantityFilterOptions: Array<string> = ['EQUAL', 'LESS_THAN', 'GREATER_THAN', 'BETWEEN']

  constructor() {}

  ngOnInit(): void {
    this.filter?.selectedConcepts.forEach((concept) => this.selectedMap.set(concept, false))
    this.selectedUnit =
      this.termEntry.valueDefinition?.allowedUnits?.length > 0
        ? this.termEntry.valueDefinition?.allowedUnits[0]
        : undefined
    this.quantityFilterOption = this.getQuantityFilterOption()
  }

  private getQuantityFilterOption(): string {
    if (!this.filter || this.filter.type === OperatorOptions.CONCEPT) {
      return null
    }

    if (this.filter.type === OperatorOptions.QUANTITY_RANGE) {
      return 'BETWEEN'
    }

    switch (this.filter.comparator) {
      case Comparator.EQUAL:
        return 'EQUAL'
      case Comparator.GREATER_OR_EQUAL:
      case Comparator.GREATER_THAN:
        return 'GREATER_THAN'
      case Comparator.LESS_OR_EQUAL:
      case Comparator.LESS_THAN:
        return 'LESS_THAN'
      default:
        return null
    }
  }

  roundMinValue(): void {
    this.filter.minValue = this.round(this.filter.minValue)
  }

  roundMaxValue(): void {
    this.filter.maxValue = this.round(this.filter.maxValue)
  }

  roundValue(): void {
    this.filter.value = this.round(this.filter.value)
  }

  private round(value: number): number {
    const divisor = Math.pow(10, this.filter.precision)
    return Math.round(value * divisor) / divisor
  }

  selectQuantityFilterOption(option: string): void {
    if (option === 'BETWEEN') {
      this.filter.type = OperatorOptions.QUANTITY_RANGE
    } else {
      this.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      switch (option) {
        case 'EQUAL':
          this.filter.comparator = Comparator.EQUAL
          break
        case 'LESS_THAN':
          this.filter.comparator = Comparator.LESS_THAN
          break
        case 'GREATER_THAN':
          this.filter.comparator = Comparator.GREATER_THAN
          break
      }
    }
  }
}
