import { TerminologyEntry } from '../model/api/terminology/terminology'
import { TermEntry2CriterionTranslator } from './TermEntry2CriterionTranslator'
import { Criterion } from '../model/api/query/criterion'
import { ValueDefinition, ValueType } from '../model/api/terminology/valuedefinition'
import { Comparator, OperatorOptions, ValueFilter } from '../model/api/query/valueFilter'

describe('TermEntry2CriterionTranslator', () => {
  const translator = new TermEntry2CriterionTranslator()

  function createTermEntry(): TerminologyEntry {
    return {
      id: 'abc',
      termCode: { code: 'A', system: 'http://test', display: 'none' },
      leaf: true,
      children: [],
      selectable: true,
      selected: true,
      timeRestrictionAllowed: false,
    }
  }

  function createExpectedCriterion(): Criterion {
    return {
      termCode: {
        code: 'A',
        display: 'none',
        system: 'http://test',
      },
      termEntry: {
        children: [],
        id: 'abc',
        leaf: true,
        selectable: true,
        selected: true,
        termCode: {
          code: 'A',
          display: 'none',
          system: 'http://test',
        },
        timeRestrictionAllowed: false,
      },
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
      value: 0,
      comparator: Comparator.GREATER_OR_EQUAL,
      minValue: 0,
      maxValue: 0,
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
    const termEntry: TerminologyEntry = createTermEntry()
    termEntry.valueDefinition = createValueDefinitionGeneral()
    termEntry.valueDefinition.type = ValueType.QUANTITY

    const criterion = translator.translate(termEntry)

    const expectedCriterion = createExpectedCriterion()
    expectedCriterion.termEntry = termEntry
    expectedCriterion.valueFilter = createExpectedValueFilterQuantity()

    expect(criterion).toEqual(expectedCriterion)
  })

  it('should create criterion with value filter (concept) but without time restriction', () => {
    const termEntry: TerminologyEntry = createTermEntry()
    termEntry.valueDefinition = createValueDefinitionGeneral()
    termEntry.valueDefinition.type = ValueType.CONCEPT

    const criterion = translator.translate(termEntry)

    const expectedCriterion = createExpectedCriterion()
    expectedCriterion.termEntry = termEntry
    expectedCriterion.valueFilter = createExpectedValueFilterConcept()

    expect(criterion).toEqual(expectedCriterion)
  })
})
