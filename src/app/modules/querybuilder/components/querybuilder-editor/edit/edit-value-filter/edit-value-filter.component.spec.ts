import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditValueFilterComponent } from './edit-value-filter.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { ValueType } from '../../../../model/api/terminology/valuedefinition'
import { Comparator, OperatorOptions, ValueFilter } from '../../../../model/api/query/valueFilter'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'

describe('EditValueDefinitionComponent', () => {
  let component: EditValueFilterComponent
  let fixture: ComponentFixture<EditValueFilterComponent>

  const termEntryWithoutFilter: TerminologyEntry = {
    termCode: {
      code: 'I00',
      system: 'http://test',
      display: 'No Value Filter',
    },
    selected: false,
    children: [],
    leaf: true,
    selectable: true,
    id: 'A1',
    timeRestrictionAllowed: true,
  }

  const termEntryWithConceptFilter: TerminologyEntry = {
    termCode: {
      code: 'I00',
      system: 'http://test',
      display: 'Concept filter',
    },
    selected: false,
    children: [],
    leaf: true,
    selectable: true,
    id: 'A2',
    timeRestrictionAllowed: true,
    valueDefinition: {
      type: ValueType.CONCEPT,
      precision: 0,
      selectableConcepts: [
        {
          code: 'A3_1',
          system: 'http://test',
          display: 'First',
        },
      ],
    },
  }

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

  const termEntryWithQuantityFilter: TerminologyEntry = {
    termCode: {
      code: 'I00',
      system: 'http://test',
      display: 'Quantity filter',
    },
    selected: false,
    children: [],
    leaf: true,
    selectable: true,
    id: 'A2',
    timeRestrictionAllowed: true,
    valueDefinition: {
      type: ValueType.QUANTITY,
      min: 0,
      max: 100,
      precision: 2,
      allowedUnits: [{ code: 'a', display: 'year' }],
    },
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

  it('should create without filter', () => {
    component.termEntry = termEntryWithoutFilter
    component.filter = undefined

    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should create for quantity filter', () => {
    component.termEntry = termEntryWithQuantityFilter
    component.filter = valueFilterQuantity

    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should create for concept filter', () => {
    component.termEntry = termEntryWithConceptFilter
    component.filter = valueFilterConcept

    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
