import { TerminologyEntry } from '../model/api/terminology/terminology'
import { TermEntry2CriterionTranslator } from './TermEntry2CriterionTranslator'
import { Criterion } from '../model/api/query/criterion'
import { ValueDefinition, ValueType } from '../model/api/terminology/valuedefinition'
import { Comparator, OperatorOptions, ValueFilter } from '../model/api/query/valueFilter'

describe('TermEntry2CriterionTranslator', () => {
  const translator = new TermEntry2CriterionTranslator(false, 'v1')

  function createTermEntry(): TerminologyEntry {
    return {
      id: 'abc',
      termCode: { code: 'A', system: 'http://test', display: 'none' },
      display: 'ui-display',
      leaf: true,
      entity: false,
      children: [],
      selectable: true,
      selected: true,
      valueDefinitions: [],
      timeRestrictionAllowed: false,
    }
  }

  function createExpectedCriterion(): Criterion {
    return {
      children: [],
      termCodes: [
        {
          code: 'A',
          display: 'none',
          system: 'http://test',
        },
      ],
      display: 'ui-display',
      valueFilters: [],
    }
  }

  function createValueDefinitionGeneral(): ValueDefinition {
    return {
      precision: 7,
      type: ValueType.QUANTITY,
      min: -80,
      max: 20,
      display: 'Laborwert',
      allowedUnits: [
        { code: 'cm', display: 'Centimeter' },
        { code: 'm', display: 'meter' },
      ],
      selectableConcepts: [
        { code: 'A', system: 'http://test1', display: 'Value A' },
        { code: 'B', system: 'http://test2', display: 'Value B' },
      ],
    }
  }

  function createExpectedValueFilterQuantity(): ValueFilter {
    return {
      type: OperatorOptions.QUANTITY_RANGE,
      display: 'Laborwert',
      unit: { code: 'cm', display: 'Centimeter' },
      precision: 7,
      min: -80,
      max: 20,
      value: -80,
      comparator: Comparator.GREATER_OR_EQUAL,
      minValue: -80,
      maxValue: 20,
      selectedConcepts: [],
    }
  }

  function createExpectedValueFilterConcept(): ValueFilter {
    return {
      type: OperatorOptions.CONCEPT,
      display: 'Laborwert',
      selectedConcepts: [],
    }
  }

  it('should create criterion without value filter and without time restriction', () => {
    const termEntry: TerminologyEntry = createTermEntry()
    const criterion = translator.translate(termEntry)

    expect(criterion).toEqual(createExpectedCriterion())
  })

  it('should create criterion with value filter (quantity) but without time restriction', () => {
    const valueDefinition = createValueDefinitionGeneral()
    valueDefinition.type = ValueType.QUANTITY

    const termEntry: TerminologyEntry = createTermEntry()
    termEntry.valueDefinitions = [valueDefinition]

    const criterion = translator.translate(termEntry)

    const expectedCriterion = createExpectedCriterion()
    const expectedValueFilter = createExpectedValueFilterQuantity()
    expectedValueFilter.valueDefinition = valueDefinition

    expectedCriterion.valueFilters = [expectedValueFilter]

    expect(criterion).toEqual(expectedCriterion)
  })

  it('should create criterion with value filter (concept) but without time restriction', () => {
    const valueDefinition = createValueDefinitionGeneral()
    valueDefinition.type = ValueType.CONCEPT

    const termEntry: TerminologyEntry = createTermEntry()
    termEntry.valueDefinitions = [valueDefinition]

    const criterion = translator.translate(termEntry)

    const expectedCriterion = createExpectedCriterion()
    const expectedValueFilter = createExpectedValueFilterConcept()
    expectedValueFilter.valueDefinition = valueDefinition

    expectedCriterion.valueFilters = [expectedValueFilter]

    expect(criterion).toEqual(expectedCriterion)
  })
})
