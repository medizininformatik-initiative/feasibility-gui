import { Query, QueryOnlyV1 } from '../model/api/query/query'

// translates a query with groups to the agreed format of queries in version 1 (without groups)
export class ApiTranslator {
  translateToV1(query: Query): QueryOnlyV1 {
    const result = new QueryOnlyV1()

    result.display = query.display
    result.exclusionCriteria = this.deepClone(query.groups[0].exclusionCriteria)
    result.inclusionCriteria = this.deepClone(query.groups[0].inclusionCriteria)

    result.inclusionCriteria.forEach((criterionArray) =>
      criterionArray.forEach((criterion) => {
        if (!criterion.valueFilter) {
          return
        }

        criterion.valueFilter.max = undefined
        criterion.valueFilter.min = undefined
        criterion.valueFilter.precision = undefined
      })
    )

    result.exclusionCriteria.forEach((criterionArray) =>
      criterionArray.forEach((criterion) => {
        if (!criterion.valueFilter) {
          return
        }

        criterion.valueFilter.max = undefined
        criterion.valueFilter.min = undefined
        criterion.valueFilter.precision = undefined
      })
    )

    return result
  }

  // noinspection JSMethodCanBeStatic
  private deepClone<T>(value): T {
    return JSON.parse(JSON.stringify(value))
  }
}
