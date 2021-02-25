import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditValueFilterComponent } from './edit-value-filter.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { Comparator, OperatorOptions, ValueFilter } from '../../../../model/api/query/valueFilter'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'

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
})
