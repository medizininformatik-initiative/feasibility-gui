import { TerminologyEntry } from '../model/api/terminology/terminology'
import { Criterion } from '../model/api/query/criterion'
import { Comparator, OperatorOptions, ValueFilter } from '../model/api/query/valueFilter'
import {
  AttributeDefinition,
  ValueDefinition,
  ValueType,
} from '../model/api/terminology/valuedefinition'
import { TimeRestriction } from '../model/api/query/timerestriction'
import { V2 } from '../model/api/annotations'

export class TermEntry2CriterionTranslator {
  private useFeatureTimeRestrictions = false
  private queryVersion: string

  constructor(useFeatureTimeRestrictions = false, queryVersion) {
    this.useFeatureTimeRestrictions = useFeatureTimeRestrictions
    this.queryVersion = queryVersion
  }

  public translate(termEntry: TerminologyEntry): Criterion {
    const criterion = new Criterion()

    criterion.display = termEntry.display
    if (this.queryVersion === 'v1') {
      termEntry.valueDefinitions.forEach((valueDefinition) => {
        criterion.valueFilters.push(this.createValueFilter(valueDefinition))
      })
      criterion.termCodes.push(termEntry.termCode)
      criterion.attributeFilters = undefined
    }
    if (this.queryVersion === 'v2') {
      if (termEntry.valueDefinition) {
        criterion.valueFilters.push(this.createValueFilter(termEntry.valueDefinition))
      }
      termEntry.attributeDefinitions?.forEach((attributeDefinition) => {
        criterion.attributeFilters.push(this.createAttributeFilter(attributeDefinition))
      })
      termEntry.termCodes?.forEach((termCode) => {
        criterion.termCodes.push(termCode)
      })
    }
    criterion.children = termEntry.children
    criterion.timeRestriction = this.createTimeRestriction(termEntry)

    return criterion
  }

  // noinspection JSMethodCanBeStatic
  private createValueFilter(valueDefinition: ValueDefinition): ValueFilter {
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
          : { code: '', display: '' }
      valueFilter.value = valueDefinition.min ? valueDefinition.min : 0
      valueFilter.minValue = valueDefinition.min ? valueDefinition.min : 0
      valueFilter.maxValue = valueDefinition.max ? valueDefinition.max : 0
      valueFilter.min = valueDefinition.min
      valueFilter.max = valueDefinition.max
      valueFilter.precision = valueDefinition.precision
      valueFilter.comparator = Comparator.GREATER_OR_EQUAL
    }

    return valueFilter
  }

  // noinspection JSMethodCanBeStatic
  private createAttributeFilter(attributeDefinition: AttributeDefinition): ValueFilter {
    const valueFilter = new ValueFilter()
    valueFilter.display = attributeDefinition.display
    valueFilter.attributeDefinition = attributeDefinition

    if (attributeDefinition.type === ValueType.CONCEPT) {
      valueFilter.type = OperatorOptions.CONCEPT
      valueFilter.selectedConcepts = []
    } else if (attributeDefinition.type === ValueType.QUANTITY) {
      valueFilter.type = OperatorOptions.QUANTITY_RANGE
      valueFilter.unit =
        attributeDefinition.allowedUnits.length > 0
          ? attributeDefinition.allowedUnits[0]
          : { code: '', display: '' }
      valueFilter.value = attributeDefinition.min ? attributeDefinition.min : 0
      valueFilter.minValue = attributeDefinition.min ? attributeDefinition.min : 0
      valueFilter.maxValue = attributeDefinition.max ? attributeDefinition.max : 0
      valueFilter.min = attributeDefinition.min
      valueFilter.max = attributeDefinition.max
      valueFilter.precision = attributeDefinition.precision
      valueFilter.comparator = Comparator.GREATER_OR_EQUAL
    }

    return valueFilter
  }

  @V2()
  private createTimeRestriction(termEntry: TerminologyEntry): TimeRestriction {
    if (!this.useFeatureTimeRestrictions) {
      return undefined
    }

    return termEntry.timeRestrictionAllowed ? new TimeRestriction() : undefined
  }
}
