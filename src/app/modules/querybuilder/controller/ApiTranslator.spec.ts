import { ApiTranslator } from './ApiTranslator'
import { Query } from '../model/api/query/query'
import { Criterion } from '../model/api/query/criterion'
import { Comparator, OperatorOptions } from '../model/api/query/valueFilter'
import { ValueType } from '../model/api/terminology/valuedefinition'

describe('ApiTranslator', () => {
  const displayQuery = 'Query 1'
  const display = 'something'
  const precision = 7
  const min = -100
  const max = 100
  const value = 47
  const comparator = Comparator.LESS_OR_EQUAL
  const minValue = -20
  const maxValue = 20
  const codeYear = 'a'
  const displayYear = 'Year'
  const codeConcept = 'abc'
  const displayConcept = 'anything'
  const systemConcept = 'http://test'

  describe('ValueFilter properties', () => {
    const translator = new ApiTranslator()

    const createOuterCritArray = (...types: OperatorOptions[]): Array<Criterion[]> => {
      const outerCritArray: Array<Criterion[]> = []
      const innerCritArray: Array<Criterion> = []

      const criterion = new Criterion()
      types.forEach((type) => {
        const typeDefinition: ValueType =
          type === OperatorOptions.CONCEPT ? ValueType.CONCEPT : ValueType.QUANTITY
        const valueFilter = {
          type,

          valueDefinition: {
            precision,
            min,
            max,
            allowedUnits: [{ code: codeYear, display: displayYear }],
            type: typeDefinition,
            display,
            selectableConcepts: [
              { code: codeConcept, display: displayConcept, system: systemConcept },
              { code: '2', display: '2', system: systemConcept },
            ],
          },
          display,

          unit: { code: codeYear, display: displayYear },
          precision,
          min,
          max,

          value,
          comparator,

          minValue,
          maxValue,

          selectedConcepts: [{ code: codeConcept, display: displayConcept, system: systemConcept }],
        }
        criterion.valueFilters.push(valueFilter)
      })

      innerCritArray.push(criterion)
      outerCritArray.push(innerCritArray)

      return outerCritArray
    }

    const createQuery = (...types: OperatorOptions[]): Query => {
      const queryTemp = new Query()

      queryTemp.display = displayQuery

      queryTemp.groups[0].inclusionCriteria = createOuterCritArray(...types)
      queryTemp.groups[0].exclusionCriteria = createOuterCritArray(...types)

      return queryTemp
    }

    it('should run also for missing value filter', () => {
      const query = createQuery()

      const queryTranslated = translator.translateToV1(query)
      expect(queryTranslated.display).toBe(displayQuery)
      expect(queryTranslated.inclusionCriteria[0][0].valueFilter).toBeFalsy()
      expect(queryTranslated.exclusionCriteria[0][0].valueFilter).toBeFalsy()
    })

    describe('values of translated query (QUANTITY_COMPARATOR)', () => {
      const query = createQuery(OperatorOptions.QUANTITY_COMPARATOR)

      it('display in translated query should be equal to original display', () => {
        expect(translator.translateToV1(query).display).toBe(displayQuery)
      })

      it('transient fields and "minValue, maxValue, selectedConcepts" of inclusion criteria in translated query should be deleted', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.QUANTITY_COMPARATOR)
        expect(valueFilterTranslatedQuery.valueDefinition).toBeFalsy()
        expect(valueFilterTranslatedQuery.display).toBe(display)
        expect(valueFilterTranslatedQuery.unit).toEqual({ code: codeYear, display: displayYear })
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
        expect(valueFilterTranslatedQuery.value).toBe(value)
        expect(valueFilterTranslatedQuery.comparator).toBe(comparator)
        expect(valueFilterTranslatedQuery.minValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.maxValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.selectedConcepts).toBeFalsy()
      })

      it('transient fields and "minValue, maxValue, selectedConcepts" of exclusion criteria in translated query should be deleted', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.QUANTITY_COMPARATOR)
        expect(valueFilterTranslatedQuery.valueDefinition).toBeFalsy()
        expect(valueFilterTranslatedQuery.display).toBe(display)
        expect(valueFilterTranslatedQuery.unit).toEqual({ code: codeYear, display: displayYear })
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
        expect(valueFilterTranslatedQuery.value).toBe(value)
        expect(valueFilterTranslatedQuery.comparator).toBe(comparator)
        expect(valueFilterTranslatedQuery.minValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.maxValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.selectedConcepts).toBeFalsy()
      })
    })

    describe('values of translated query (QUANTITY_RANGE)', () => {
      const query = createQuery(OperatorOptions.QUANTITY_RANGE)

      it('display in translated query should be equal to original display', () => {
        expect(translator.translateToV1(query).display).toBe(displayQuery)
      })

      it('transient fields and "value, comparator, selectedConcepts" of inclusion criteria in translated query should be deleted', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.QUANTITY_RANGE)
        expect(valueFilterTranslatedQuery.valueDefinition).toBeFalsy()
        expect(valueFilterTranslatedQuery.display).toBe(display)
        expect(valueFilterTranslatedQuery.unit).toEqual({ code: codeYear, display: displayYear })
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
        expect(valueFilterTranslatedQuery.value).toBeFalsy()
        expect(valueFilterTranslatedQuery.comparator).toBeFalsy()
        expect(valueFilterTranslatedQuery.minValue).toBe(minValue)
        expect(valueFilterTranslatedQuery.maxValue).toBe(maxValue)
        expect(valueFilterTranslatedQuery.selectedConcepts).toBeFalsy()
      })

      it('transient fields and "value, comparator, selectedConcepts" of exclusion criteria in translated query should be deleted', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.QUANTITY_RANGE)
        expect(valueFilterTranslatedQuery.valueDefinition).toBeFalsy()
        expect(valueFilterTranslatedQuery.display).toBe(display)
        expect(valueFilterTranslatedQuery.unit).toEqual({ code: codeYear, display: displayYear })
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
        expect(valueFilterTranslatedQuery.value).toBeFalsy()
        expect(valueFilterTranslatedQuery.comparator).toBeFalsy()
        expect(valueFilterTranslatedQuery.minValue).toBe(minValue)
        expect(valueFilterTranslatedQuery.maxValue).toBe(maxValue)
        expect(valueFilterTranslatedQuery.selectedConcepts).toBeFalsy()
      })
    })

    describe('values of translated query (CONCEPT)', () => {
      const query = createQuery(OperatorOptions.CONCEPT)

      it('display in translated query should be equal to original display', () => {
        expect(translator.translateToV1(query).display).toBe(displayQuery)
      })

      it('transient fields and "value, comparator, minValue, maxValue" of inclusion criteria in translated query should be deleted', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.CONCEPT)
        expect(valueFilterTranslatedQuery.valueDefinition).toBeFalsy()
        expect(valueFilterTranslatedQuery.display).toBe(display)
        expect(valueFilterTranslatedQuery.unit).toBeFalsy()
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
        expect(valueFilterTranslatedQuery.value).toBeFalsy()
        expect(valueFilterTranslatedQuery.comparator).toBeFalsy()
        expect(valueFilterTranslatedQuery.minValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.maxValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.selectedConcepts).toEqual([
          {
            code: codeConcept,
            display: displayConcept,
            system: systemConcept,
          },
        ])
      })

      it('transient fields and "value, comparator, minValue, maxValue" of exclusion criteria in translated query should be deleted', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.CONCEPT)
        expect(valueFilterTranslatedQuery.valueDefinition).toBeFalsy()
        expect(valueFilterTranslatedQuery.display).toBe(display)
        expect(valueFilterTranslatedQuery.unit).toBeFalsy()
        expect(valueFilterTranslatedQuery.precision).toBeFalsy()
        expect(valueFilterTranslatedQuery.min).toBeFalsy()
        expect(valueFilterTranslatedQuery.max).toBeFalsy()
        expect(valueFilterTranslatedQuery.value).toBeFalsy()
        expect(valueFilterTranslatedQuery.comparator).toBeFalsy()
        expect(valueFilterTranslatedQuery.minValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.maxValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.selectedConcepts).toEqual([
          {
            code: codeConcept,
            display: displayConcept,
            system: systemConcept,
          },
        ])
      })
    })

    describe('values of translated query with multiple value filters', () => {
      const query = createQuery(OperatorOptions.CONCEPT, OperatorOptions.QUANTITY_RANGE)

      it('should ignore second value filter and use only the first one (CONCEPT) for inclusion criteria', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).inclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.CONCEPT)
        expect(valueFilterTranslatedQuery.unit).toBeFalsy()
        expect(valueFilterTranslatedQuery.minValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.maxValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.selectedConcepts).toEqual([
          {
            code: codeConcept,
            display: displayConcept,
            system: systemConcept,
          },
        ])
      })

      it('should ignore second value filter and use only the first one (CONCEPT) for exclusion criteria', () => {
        const valueFilterTranslatedQuery = translator.translateToV1(query).exclusionCriteria[0][0]
          .valueFilter
        expect(valueFilterTranslatedQuery.type).toBe(OperatorOptions.CONCEPT)
        expect(valueFilterTranslatedQuery.unit).toBeFalsy()
        expect(valueFilterTranslatedQuery.minValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.maxValue).toBeFalsy()
        expect(valueFilterTranslatedQuery.selectedConcepts).toEqual([
          {
            code: codeConcept,
            display: displayConcept,
            system: systemConcept,
          },
        ])
      })
    })

    describe('values of original query', () => {
      const query = createQuery(OperatorOptions.QUANTITY_COMPARATOR)
      // noinspection JSUnusedLocalSymbols
      const queryTranslated = translator.translateToV1(query)

      it('display in original query should be equal to original display', () => {
        expect(query.display).toBe(displayQuery)
      })

      it('inclusion criteria in original query should remain untouched', () => {
        const valueFilterOriginal = query.groups[0].inclusionCriteria[0][0].valueFilters[0]
        expect(valueFilterOriginal.type).toBe(OperatorOptions.QUANTITY_COMPARATOR)
        expect(valueFilterOriginal.valueDefinition).toBeTruthy()
        expect(valueFilterOriginal.display).toBe(display)
        expect(valueFilterOriginal.unit).toEqual({ code: codeYear, display: displayYear })
        expect(valueFilterOriginal.precision).toBe(precision)
        expect(valueFilterOriginal.min).toBe(min)
        expect(valueFilterOriginal.max).toBe(max)
        expect(valueFilterOriginal.value).toBe(value)
        expect(valueFilterOriginal.comparator).toBe(comparator)
        expect(valueFilterOriginal.minValue).toBe(minValue)
        expect(valueFilterOriginal.maxValue).toBe(maxValue)
        expect(valueFilterOriginal.selectedConcepts).toEqual([
          {
            code: codeConcept,
            display: displayConcept,
            system: systemConcept,
          },
        ])
      })

      it('exclusion criteria in original query should remain untouched', () => {
        const valueFilterOriginal = query.groups[0].exclusionCriteria[0][0].valueFilters[0]
        expect(valueFilterOriginal.type).toBe(OperatorOptions.QUANTITY_COMPARATOR)
        expect(valueFilterOriginal.valueDefinition).toBeTruthy()
        expect(valueFilterOriginal.display).toBe(display)
        expect(valueFilterOriginal.unit).toEqual({ code: codeYear, display: displayYear })
        expect(valueFilterOriginal.precision).toBe(precision)
        expect(valueFilterOriginal.min).toBe(min)
        expect(valueFilterOriginal.max).toBe(max)
        expect(valueFilterOriginal.value).toBe(value)
        expect(valueFilterOriginal.comparator).toBe(comparator)
        expect(valueFilterOriginal.minValue).toBe(minValue)
        expect(valueFilterOriginal.maxValue).toBe(maxValue)
        expect(valueFilterOriginal.selectedConcepts).toEqual([
          {
            code: codeConcept,
            display: displayConcept,
            system: systemConcept,
          },
        ])
      })
    })
  })
})
