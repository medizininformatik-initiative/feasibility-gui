import { ApiTranslator } from './ApiTranslator'
import { Query } from '../model/api/query/query'
import { Criterion } from '../model/api/query/criterion'
import { OperatorOptions } from '../model/api/query/valueFilter'
import { Group } from '../model/api/query/group'

describe('ApiTranslator', () => {
  describe('ValueFilter properties', () => {
    const displayForTest = 'Query 1'
    const translator = new ApiTranslator()
    let query

    function createOuterCritArray(createValueFilter = true): Array<Criterion[]> {
      const outerCritArray: Array<Criterion[]> = []
      const innerCritArray: Array<Criterion> = []

      const criterion = new Criterion()
      if (createValueFilter) {
        criterion.valueFilter = {
          type: OperatorOptions.QUANTITY_COMPARATOR,
          precision: 1,
          min: -1,
          max: 1,
          value: 4711,
          unit: { code: 'a', display: 'year' },
        }
      }

      innerCritArray.push(criterion)
      outerCritArray.push(innerCritArray)

      return outerCritArray
    }

    function createQueryWithValueFilter(): Query {
      const queryTemp = new Query()

      queryTemp.display = displayForTest

      queryTemp.groups[0].inclusionCriteria = createOuterCritArray()
      queryTemp.groups[0].exclusionCriteria = createOuterCritArray()

      return queryTemp
    }

    beforeEach(() => {
      query = createQueryWithValueFilter()
    })

    it('should run also for missing value filter', () => {
      const queryWithoutValueFilters = new Query()
      queryWithoutValueFilters.display = displayForTest

      const group = new Group()

      group.exclusionCriteria = createOuterCritArray(false)
      group.inclusionCriteria = createOuterCritArray(false)

      queryWithoutValueFilters.groups[0] = group

      const queryTranslated = translator.translateToV1(queryWithoutValueFilters)
      expect(queryTranslated.display).toBe(displayForTest)
      expect(queryTranslated.inclusionCriteria[0][0].valueFilter).toBeFalsy()
      expect(queryTranslated.exclusionCriteria[0][0].valueFilter).toBeFalsy()
    })

    describe('values of translated query', () => {
      it('display in translated query should be equal to original display', () => {
        expect(translator.translateToV1(query).display).toBe(displayForTest)
      })

      it('field of inclusion criteria in translated query should be deleted (min)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
      })
      it('field of inclusion criteria in translated query should be deleted (max)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
      })
      it('field of inclusion criteria in translated query should be deleted (precision)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
      })
      it('field of inclusion criteria in translated query should not be deleted (unit)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.unit).toBeTruthy()
      })
      it('field of inclusion criteria in translated query should not be deleted (value)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.value).toBeTruthy()
      })

      it('field of exclusion criteria in translated query should be deleted (min)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
      })
      it('field of exclusion criteria in translated query should be deleted (max)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
      })
      it('field of exclusion criteria in translated query should be deleted (precision)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
      })
      it('field of exclusion criteria in translated query should not be deleted (unit)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.unit).toBeTruthy()
      })
      it('field of exclusion criteria in translated query should not be deleted (value)', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.value).toBeTruthy()
      })
    })

    describe('values of original query', () => {
      it('display in original query should be equal to original display', () => {
        expect(query.display).toBe(displayForTest)
      })

      it('inclusion criteria in original query should remain untouched (min)', () => {
        const valueFilterOriginal = query.groups[0].inclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.min).toBeTruthy()
      })
      it('inclusion criteria in original query should remain untouched (max)', () => {
        const valueFilterOriginal = query.groups[0].inclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.max).toBeTruthy()
      })
      it('inclusion criteria in original query should remain untouched (precision)', () => {
        const valueFilterOriginal = query.groups[0].inclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.precision).toBeTruthy()
      })
      it('inclusion criteria in original query should remain untouched (unit)', () => {
        const valueFilterOriginal = query.groups[0].inclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.unit).toBeTruthy()
      })
      it('inclusion criteria in original query should remain untouched (value)', () => {
        const valueFilterOriginal = query.groups[0].inclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.value).toBeTruthy()
      })

      it('exclusion criteria in original query should remain untouched (min)', () => {
        const valueFilterOriginal = query.groups[0].exclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.min).toBeTruthy()
      })
      it('exclusion criteria in original query should remain untouched (max)', () => {
        const valueFilterOriginal = query.groups[0].exclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.max).toBeTruthy()
      })
      it('exclusion criteria in original query should remain untouched (precision)', () => {
        const valueFilterOriginal = query.groups[0].exclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.precision).toBeTruthy()
      })
      it('exclusion criteria in original query should remain untouched (unit)', () => {
        const valueFilterOriginal = query.groups[0].exclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.unit).toBeTruthy()
      })
      it('exclusion criteria in original query should remain untouched (value)', () => {
        const valueFilterOriginal = query.groups[0].exclusionCriteria[0][0].valueFilter
        expect(valueFilterOriginal.value).toBeTruthy()
      })
    })
  })
})
