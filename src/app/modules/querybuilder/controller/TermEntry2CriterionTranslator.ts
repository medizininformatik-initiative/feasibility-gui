import { TerminologyEntry } from '../model/api/terminology/terminology'
import { Criterion } from '../model/api/query/criterion'
import { Comparator, OperatorOptions, ValueFilter } from '../model/api/query/valueFilter'
import { ValueDefinition, ValueType } from '../model/api/terminology/valuedefinition'
import { TimeRestriction } from '../model/api/query/timerestriction'
import { V2 } from '../model/api/annotations'

export class TermEntry2CriterionTranslator {
  public translate(termEntry: TerminologyEntry): Criterion {
    const criterion = new Criterion()

    criterion.termCode = termEntry.termCode
    criterion.valueFilters = this.createValueFilter(termEntry.valueDefinition)
      ? [this.createValueFilter(termEntry.valueDefinition)]
      : []
    criterion.timeRestriction = this.createTimeRestriction(termEntry.valueDefinition)

    return criterion
  }

  // noinspection JSMethodCanBeStatic
  private createValueFilter(valueDefinition: ValueDefinition): ValueFilter {
    if (!valueDefinition) {
      return undefined
    }

    const valueFilter = new ValueFilter()
    valueFilter.display = valueDefinition.display
    valueFilter.valueDefinition = valueDefinition

    if (valueDefinition.type === ValueType.CONCEPT) {
      valueFilter.type = OperatorOptions.CONCEPT
      valueFilter.selectedConcepts = []
    } else if (valueDefinition.type === ValueType.QUANTITY) {
      valueFilter.type = OperatorOptions.QUANTITY_RANGE
      valueFilter.unit =
        valueDefinition.allowedUnits.length > 0
          ? valueDefinition.allowedUnits[0]
          : { code: '1', display: '' }
      valueFilter.value = 0
      valueFilter.minValue = 0
      valueFilter.maxValue = 0
      valueFilter.min = valueDefinition.min
      valueFilter.max = valueDefinition.max
      valueFilter.precision = valueDefinition.precision
      valueFilter.comparator = Comparator.GREATER_OR_EQUAL
    }

    return valueFilter
  }

  @V2()
  private createTimeRestriction(valueDefinition: ValueDefinition): TimeRestriction {
    return undefined
  }
}
