import { Query, QueryOnlyV1 } from '../model/api/query/query'
import { Criterion } from '../model/api/query/criterion'
import { ObjectHelper } from './ObjectHelper'
import { OperatorOptions } from '../model/api/query/valueFilter'

// translates a query with groups to the agreed format of queries in version 1 (without groups)
export class ApiTranslator {
  translateToV1(query: Query): QueryOnlyV1 {
    const result = new QueryOnlyV1()

    result.display = query.display
    result.exclusionCriteria = ObjectHelper.clone(query.groups[0].exclusionCriteria)
    result.inclusionCriteria = ObjectHelper.clone(query.groups[0].inclusionCriteria)

    result.inclusionCriteria.forEach((criterionArray) =>
      criterionArray.forEach((criterion) => {
        this.removeNonApiFields(criterion)
      })
    )

    result.exclusionCriteria.forEach((criterionArray) =>
      criterionArray.forEach((criterion) => {
        this.removeNonApiFields(criterion)
      })
    )

    return result
  }

  // noinspection JSMethodCanBeStatic
  private removeNonApiFields(criterion: Criterion): void {
    criterion.termEntry = undefined

    if (criterion.valueFilter) {
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
      } else if (criterion.valueFilter.type === OperatorOptions.QUANTITY_COMPARATOR) {
        criterion.valueFilter.minValue = undefined
        criterion.valueFilter.maxValue = undefined
        criterion.valueFilter.selectedConcepts = undefined
      }
    }
  }
}
