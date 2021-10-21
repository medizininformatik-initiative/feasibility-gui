import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditValueFilterComponent } from './edit-value-filter.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import {
  Comparator,
  OperatorOptions,
  QuantityUnit,
  ValueFilter,
} from '../../../../model/api/query/valueFilter'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { TerminologyCode } from '../../../../model/api/terminology/terminology'
import { ObjectHelper } from '../../../../controller/ObjectHelper'
import { ValueType } from '../../../../model/api/terminology/valuedefinition'

describe('EditValueDefinitionComponent', () => {
  let component: EditValueFilterComponent
  let fixture: ComponentFixture<EditValueFilterComponent>

  const valueFilterConcept: ValueFilter = { selectedConcepts: [], type: OperatorOptions.CONCEPT }
  const valueFilterQuantity: ValueFilter = {
    selectedConcepts: [],
    type: OperatorOptions.QUANTITY_RANGE,
    unit: { code: 'a', display: 'year' },
    value: 0,
    minValue: 0,
    maxValue: 0,
    min: 0,
    max: 100,
    precision: 2,
    comparator: Comparator.GREATER_OR_EQUAL,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        MatInputNumberDirective,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditValueFilterComponent)
    component = fixture.componentInstance
  })

  describe('create component', () => {
    it('should create without filter', () => {
      component.filter = undefined

      fixture.detectChanges()
      expect(component).toBeTruthy()
    })

    it('should create for quantity filter', () => {
      component.filter = valueFilterQuantity

      fixture.detectChanges()
      expect(component).toBeTruthy()
    })

    it('should create for concept filter', () => {
      component.filter = valueFilterConcept

      fixture.detectChanges()
      expect(component).toBeTruthy()
    })

    const unitA: QuantityUnit = { code: 'a', display: 'A' }
    const unitB: QuantityUnit = { code: 'b', display: 'B' }
    const unitBCloned = ObjectHelper.clone(unitB)

    it('should select unit from allowed units (equivalent to unit of filter - but not identical)', () => {
      component.filter = valueFilterQuantity
      component.filter.unit = unitBCloned
      component.filter.valueDefinition = { type: ValueType.QUANTITY, precision: 1 }
      component.filter.valueDefinition.allowedUnits = [unitA, unitB]

      fixture.detectChanges()
      expect(component.selectedUnit).toBe(unitB)
      expect(component.selectedUnit).not.toBe(unitBCloned)
    })
  })

  describe('check validity of value', () => {
    function createValueVilter(
      min: number,
      max: number,
      minValue: number,
      maxValue: number
    ): ValueFilter {
      const filter = new ValueFilter()
      filter.type = OperatorOptions.QUANTITY_RANGE
      filter.minValue = minValue
      filter.maxValue = maxValue
      filter.min = min
      filter.max = max

      return filter
    }

    it('should be non-valid for empty selection (type === concept)', () => {
      component.filter = valueFilterConcept
      component.filter.selectedConcepts = []

      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(false)
    })

    it('should be valid for non-empty selection (type === concept)', () => {
      component.filter = valueFilterConcept
      component.filter.selectedConcepts = [new TerminologyCode()]

      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(true)
    })

    it('should be non-valid for value smaller than min (type === quantity-operator)', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.value = -1
      component.filter.min = 0

      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(false)
    })

    it('should be valid for value between min and max (type === quantity-operator)', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.value = 1
      component.filter.min = 0
      component.filter.max = 2

      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(true)
    })

    it('should be non-valid for minValue smaller than min (type === quantity-range)', () => {
      component.filter = createValueVilter(0, 100, -1, 50)
      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(false)
    })

    it('should be non-valid for maxValue smaller than min (type === quantity-range)', () => {
      component.filter = createValueVilter(0, 100, 50, -1)
      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(false)
    })

    it('should be non-valid for minValue greater than max (type === quantity-range)', () => {
      component.filter = createValueVilter(0, 100, 101, 50)
      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(false)
    })

    it('should be non-valid for maxValue greater than max (type === quantity-range)', () => {
      component.filter = createValueVilter(0, 100, 50, 101)
      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(false)
    })

    it('should be non-valid for maxValue less than than or equals minValue (type === quantity-range)', () => {
      component.filter = createValueVilter(0, 100, 50, 50)
      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(false)
    })

    it('should be valid for minValue less than than maxValue (type === quantity-range)', () => {
      component.filter = createValueVilter(0, 100, 49, 50)
      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(true)
    })

    it('should be valid for type === undefined', () => {
      component.filter = new ValueFilter()
      component.filter.type = undefined
      fixture.detectChanges()
      expect(component.isActionDisabled()).not.toBe(true)
    })
  })

  describe('check value out of bounds', () => {
    it('should be truthy for value larger than max', () => {
      component.filter = valueFilterQuantity
      component.filter.max = 1

      fixture.detectChanges()
      expect(component.valueTooLarge(2)).toBeTruthy()
    })

    it('should be falsy for empty max value', () => {
      component.filter = valueFilterQuantity
      component.filter.max = undefined

      fixture.detectChanges()
      expect(component.valueTooLarge(1)).toBeFalsy()
    })

    it('should be falsy for max value 0 and value 0', () => {
      component.filter = valueFilterQuantity
      component.filter.max = 0

      fixture.detectChanges()
      expect(component.valueTooLarge(0)).toBeFalsy()
    })

    it('should be truthy for max value 0 and value greater than 0', () => {
      component.filter = valueFilterQuantity
      component.filter.max = 0

      fixture.detectChanges()
      expect(component.valueTooLarge(1)).toBeTruthy()
    })

    it('should be truthy for value less than min', () => {
      component.filter = valueFilterQuantity
      component.filter.min = 1

      fixture.detectChanges()
      expect(component.valueTooSmall(0)).toBeTruthy()
    })

    it('should be falsy for empty min value', () => {
      component.filter = valueFilterQuantity
      component.filter.min = undefined

      fixture.detectChanges()
      expect(component.valueTooSmall(-1)).toBeFalsy()
    })

    it('should be falsy for min value 0 and value 0', () => {
      component.filter = valueFilterQuantity
      component.filter.min = 0

      fixture.detectChanges()
      expect(component.valueTooSmall(0)).toBeFalsy()
    })

    it('should be truthy for min value 0 and value less than 0', () => {
      component.filter = valueFilterQuantity
      component.filter.min = 0

      fixture.detectChanges()
      expect(component.valueTooSmall(-1)).toBeTruthy()
    })
  })

  describe('select concepts', () => {
    const termCodeA: TerminologyCode = {
      code: 'a',
      system: 'http://test',
      display: 'code a',
    }
    const termCodeACloned: TerminologyCode = ObjectHelper.clone(termCodeA)
    const termCodeB: TerminologyCode = {
      code: 'b',
      system: 'http://test',
      display: 'code b',
    }
    const termCodeC: TerminologyCode = {
      code: 'c',
      system: 'http://test',
      display: 'code c',
    }

    it('should be selected for chosen term code ', () => {
      component.filter = valueFilterConcept
      component.filter.selectedConcepts = [termCodeA]

      fixture.detectChanges()
      expect(component.isSelected(termCodeA)).toBe(true)
      expect(component.isSelected(termCodeACloned)).toBe(true)
    })

    it('should not be selected for other term code ', () => {
      component.filter = valueFilterConcept
      component.filter.selectedConcepts = [termCodeA]

      fixture.detectChanges()
      expect(component.isSelected(termCodeA)).toBe(true)
      expect(component.isSelected(termCodeB)).toBe(false)
    })

    it('should add another term code ', () => {
      component.filter = valueFilterConcept
      component.filter.selectedConcepts = [termCodeA, termCodeB]

      fixture.detectChanges()
      component.doSelectConcept(termCodeC)
      expect(component.selectedConceptsAsJson.size).toBe(3)
      expect(component.filter.selectedConcepts.length).toBe(3)
      expect(component.isSelected(termCodeA)).toBe(true)
      expect(component.isSelected(termCodeB)).toBe(true)
      expect(component.isSelected(termCodeC)).toBe(true)
    })

    it('should remove term code ', () => {
      component.filter = valueFilterConcept
      component.filter.selectedConcepts = [termCodeA, termCodeB]

      fixture.detectChanges()
      component.doSelectConcept(termCodeB)
      expect(component.selectedConceptsAsJson.size).toBe(1)
      expect(component.filter.selectedConcepts.length).toBe(1)
      expect(component.isSelected(termCodeA)).toBe(true)
      expect(component.isSelected(termCodeB)).toBe(false)
      expect(component.isSelected(termCodeC)).toBe(false)
    })
  })

  describe('select operator and quantity type', () => {
    it('should select type === RANGE', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.selectQuantityFilterOption('BETWEEN')
      expect(component.filter.type).toBe(OperatorOptions.QUANTITY_RANGE)
    })

    it('should select comparator "="', () => {
      component.filter = valueFilterQuantity
      component.selectQuantityFilterOption('EQUAL')
      expect(component.filter.type).toBe(OperatorOptions.QUANTITY_COMPARATOR)
      expect(component.filter.comparator).toBe(Comparator.EQUAL)
    })

    it('should select comparator "<"', () => {
      component.filter = valueFilterQuantity
      component.selectQuantityFilterOption('LESS_THAN')
      expect(component.filter.type).toBe(OperatorOptions.QUANTITY_COMPARATOR)
      expect(component.filter.comparator).toBe(Comparator.LESS_THAN)
    })

    it('should select comparator ">"', () => {
      component.filter = valueFilterQuantity
      component.selectQuantityFilterOption('GREATER_THAN')
      expect(component.filter.type).toBe(OperatorOptions.QUANTITY_COMPARATOR)
      expect(component.filter.comparator).toBe(Comparator.GREATER_THAN)
    })

    it('should select null for empty filter', () => {
      component.filter = undefined
      expect(component.getQuantityFilterOption()).toBe(null)
    })

    it('should select null for undefined type', () => {
      component.filter = new ValueFilter()
      component.filter.type = undefined
      expect(component.getQuantityFilterOption()).toBe(null)
    })

    it('should select "BETWEEN" for type RANGE', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_RANGE
      expect(component.getQuantityFilterOption()).toBe('BETWEEN')
    })

    it('should select "EQUAL" for comparator "="', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.comparator = Comparator.EQUAL

      expect(component.getQuantityFilterOption()).toBe('EQUAL')
    })

    it('should select "LESS_THAN" for comparator "<"', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.comparator = Comparator.LESS_THAN

      expect(component.getQuantityFilterOption()).toBe('LESS_THAN')
    })

    it('should select "LESS_THAN" for comparator "<="', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.comparator = Comparator.LESS_OR_EQUAL

      expect(component.getQuantityFilterOption()).toBe('LESS_THAN')
    })

    it('should select "GREATER_THAN" for comparator ">"', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.comparator = Comparator.GREATER_THAN

      expect(component.getQuantityFilterOption()).toBe('GREATER_THAN')
    })

    it('should select "GREATER_THAN" for comparator ">="', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.comparator = Comparator.GREATER_OR_EQUAL

      expect(component.getQuantityFilterOption()).toBe('GREATER_THAN')
    })

    it('should select "null" for inequality comparator "<>"', () => {
      component.filter = valueFilterQuantity
      component.filter.type = OperatorOptions.QUANTITY_COMPARATOR
      component.filter.comparator = Comparator.NOT_EQUAL

      expect(component.getQuantityFilterOption()).toBe(null)
    })
  })

  describe('round values', () => {
    it('should round values according to precission 2', () => {
      component.filter = valueFilterQuantity
      component.filter.precision = 2
      expect(component.round(13.2)).toBe(13.2)
      expect(component.round(13.26)).toBe(13.26)
      expect(component.round(13.867)).toBe(13.87)
    })

    it('should round values according to precission 2', () => {
      component.filter = valueFilterQuantity
      component.filter.precision = 1
      expect(component.round(13.2)).toBe(13.2)
      expect(component.round(13.26)).toBe(13.3)
      expect(component.round(13.867)).toBe(13.9)
    })

    it('should round values according to precission 0', () => {
      component.filter = valueFilterQuantity
      component.filter.precision = 0
      expect(component.round(13.2)).toBe(13)
      expect(component.round(13.26)).toBe(13)
      expect(component.round(13.867)).toBe(14)
    })

    it('should round value', () => {
      component.filter = valueFilterQuantity
      component.filter.precision = 1
      component.filter.value = 13.78
      component.roundValue()
      expect(component.filter.value).toBe(13.8)
    })

    it('should min round value', () => {
      component.filter = valueFilterQuantity
      component.filter.precision = 1
      component.filter.minValue = 13.78
      component.roundMinValue()
      expect(component.filter.minValue).toBe(13.8)
    })

    it('should round value', () => {
      component.filter = valueFilterQuantity
      component.filter.precision = 1
      component.filter.maxValue = 13.78
      component.roundMaxValue()
      expect(component.filter.maxValue).toBe(13.8)
    })
  })
})
