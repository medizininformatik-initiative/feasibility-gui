import { Query, QueryOnlyV1 } from '../model/api/query/query'
import { Criterion, CriterionOnlyV1 } from '../model/api/query/criterion'
import { ObjectHelper } from './ObjectHelper'
import { OperatorOptions } from '../model/api/query/valueFilter'

// translates a query with groups to the agreed format of queries in version 1 (without groups)
export class ApiTranslator {
  translateToV1(query: Query): QueryOnlyV1 {
    const result = new QueryOnlyV1()

    result.display = query.display
    const exclusionCriteria = ObjectHelper.clone(query.groups[0].exclusionCriteria)
    const inclusionCriteria = ObjectHelper.clone(query.groups[0].inclusionCriteria)

    result.inclusionCriteria = this.translateCritGroupV1(inclusionCriteria)

    if (exclusionCriteria.length > 0) {
      result.exclusionCriteria = this.translateCritGroupV1(exclusionCriteria)
    } else {
      result.exclusionCriteria = undefined
    }

    return result
  }

  private translateCritGroupV1(inclusionCriteria: Criterion[][]): CriterionOnlyV1[][] {
    const result: CriterionOnlyV1[][] = []
    inclusionCriteria.forEach((criterionArray) => {
      const innerArrayV1: CriterionOnlyV1[] = []
      criterionArray.forEach((criterion) => {
        const criterionV1 = new CriterionOnlyV1()
        criterionV1.termCode = criterion.termCode
        criterionV1.timeRestriction = criterion.timeRestriction
        if (criterion.valueFilters.length > 0) {
          criterionV1.valueFilter = criterion.valueFilters[0]
          criterionV1.valueFilter.valueDefinition = undefined
        }

        this.removeNonApiFields(criterionV1)
        innerArrayV1.push(criterionV1)
      })
      result.push(innerArrayV1)
    })

    return result
  }

  // noinspection JSMethodCanBeStatic
  private removeNonApiFields(criterion: CriterionOnlyV1): void {
    if (criterion.valueFilter) {
      criterion.valueFilter.valueDefinition = null
      criterion.valueFilter.max = undefined
      criterion.valueFilter.min = undefined
      criterion.valueFilter.precision = undefined

      if (criterion.valueFilter.type === OperatorOptions.CONCEPT) {
        criterion.valueFilter.comparator = undefined
        criterion.valueFilter.maxValue = undefined
        criterion.valueFilter.minValue = undefined
        criterion.valueFilter.value = undefined
        criterion.valueFilter.unit = undefined
      } else if (criterion.valueFilter.type === OperatorOptions.QUANTITY_RANGE) {
        criterion.valueFilter.comparator = undefined
        criterion.valueFilter.value = undefined
        criterion.valueFilter.selectedConcepts = undefined
        if (criterion.valueFilter.unit.code == ''){
          criterion.valueFilter.unit = undefined
        }
      } else if (criterion.valueFilter.type === OperatorOptions.QUANTITY_COMPARATOR) {
        criterion.valueFilter.minValue = undefined
        criterion.valueFilter.maxValue = undefined
        criterion.valueFilter.selectedConcepts = undefined
        if (criterion.valueFilter.unit.code == ''){
          criterion.valueFilter.unit = undefined
        }
      }
    }
  }
}
