import { Component, Input, OnInit } from '@angular/core'
import {
  Comparator,
  OperatorOptions,
  QuantityUnit,
  ValueFilter,
} from '../../../../model/api/query/valueFilter'
import { TerminologyCode } from '../../../../model/api/terminology/terminology'
import { ObjectHelper } from '../../../../controller/ObjectHelper'

@Component({
  selector: 'num-edit-value-definition',
  templateUrl: './edit-value-filter.component.html',
  styleUrls: ['./edit-value-filter.component.scss'],
})
export class EditValueFilterComponent implements OnInit {
  @Input()
  filter: ValueFilter

  @Input()
  filterType: string

  OperatorOptions: typeof OperatorOptions = OperatorOptions

  selectedUnit: QuantityUnit
  // Use string representation of concept because equivalent objects do not match in TypeScript (e.g. { a: 1 } !== { a: 1 })
  selectedConceptsAsJson: Set<string> = new Set()
  quantityFilterOption: string
  // TODO: Try using enum
  quantityFilterOptions: Array<string> = ['EQUAL', 'LESS_THAN', 'GREATER_THAN', 'BETWEEN']

  constructor() {}

  ngOnInit(): void {
    this.filter?.selectedConcepts.forEach((concept) => {
      // bring the object into the right order for stringify
      const temp = { code: concept.code, display: concept.display, system: concept.system }
      this.selectedConceptsAsJson.add(JSON.stringify(temp))
    })

    this.filter?.valueDefinition?.allowedUnits?.forEach((allowedUnit) => {
      if (JSON.stringify(allowedUnit) === JSON.stringify(this.filter?.unit)) {
        this.selectedUnit = allowedUnit
      }
    })
    this.filter?.attributeDefinition?.allowedUnits?.forEach((allowedUnit) => {
      if (JSON.stringify(allowedUnit) === JSON.stringify(this.filter?.unit)) {
        this.selectedUnit = allowedUnit
      }
    })

    this.quantityFilterOption = this.getQuantityFilterOption()
  }

  getQuantityFilterOption(): string {
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

  round(value: number): number {
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

  doSelectConcept(concept: TerminologyCode): void {
    const conceptAsJson = JSON.stringify(concept)
    if (this.selectedConceptsAsJson.has(conceptAsJson)) {
      this.selectedConceptsAsJson.delete(conceptAsJson)
    } else {
      this.selectedConceptsAsJson.add(conceptAsJson)
    }

    const selectedConcepts: Array<TerminologyCode> = []
    this.selectedConceptsAsJson.forEach((conceptAsJsonTemp) =>
      selectedConcepts.push(JSON.parse(conceptAsJsonTemp))
    )

    this.filter.selectedConcepts = selectedConcepts
  }

  isSelected(concept: TerminologyCode): boolean {
    // bring the object into the right order for stringify
    const temp = { code: concept.code, display: concept.display, system: concept.system }
    return this.selectedConceptsAsJson.has(JSON.stringify(temp))
  }

  public isActionDisabled(): boolean {
    if (this.filter?.attributeDefinition) {
      if (this.filter?.attributeDefinition?.optional) {
        return false
      }
    }

    if (this.filter?.type === OperatorOptions.CONCEPT) {
      return this.noSelectedConcept()
    }

    if (this.filter?.type === OperatorOptions.QUANTITY_COMPARATOR) {
      return this.valueTooSmall(this.filter.value) || this.valueTooLarge(this.filter.value)
    }

    if (this.filter?.type === OperatorOptions.QUANTITY_RANGE) {
      return (
        this.minimumSmallerMaximum() ||
        this.valueTooSmall(this.filter.minValue) ||
        this.valueTooLarge(this.filter.minValue) ||
        this.valueTooSmall(this.filter.maxValue) ||
        this.valueTooLarge(this.filter.maxValue)
      )
    }

    return false
  }

  noSelectedConcept(): boolean {
    return this.selectedConceptsAsJson.size === 0
  }

  valueTooSmall(value: number): boolean {
    if (!ObjectHelper.isNumber(this.filter.min)) {
      return false
    }
    return value < this.filter.min
  }

  valueTooLarge(value: number): boolean {
    if (!ObjectHelper.isNumber(this.filter.max)) {
      return false
    }
    return value > this.filter.max
  }

  minimumSmallerMaximum(): boolean {
    return (
      this.filter.type === OperatorOptions.QUANTITY_RANGE &&
      this.filter.minValue >= this.filter.maxValue
    )
  }

  // values come from the for-iteration (unit), option is the selected one ([(value)]="filter.unit")
  compareFunction(values, option): boolean {
    return values.code === option.code
  }
}
