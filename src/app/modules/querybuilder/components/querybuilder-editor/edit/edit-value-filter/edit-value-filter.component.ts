import { Component, Input, OnInit } from '@angular/core'
import { OperatorOptions, QuantityUnit, ValueFilter } from '../../../../model/api/query/valueFilter'
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

  constructor() {}

  ngOnInit(): void {
    this.filter?.selectedConcepts.forEach((concept) => this.selectedMap.set(concept, false))
    this.selectedUnit =
      this.termEntry.valueDefinition?.allowedUnits?.length > 0
        ? this.termEntry.valueDefinition?.allowedUnits[0]
        : undefined
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
}
