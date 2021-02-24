import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditCriterionComponent } from './edit-criterion.component'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Criterion } from '../../../../model/api/query/criterion'
import { TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { OperatorOptions } from '../../../../model/api/query/valueFilter'
import { ValueType } from '../../../../model/api/terminology/valuedefinition'

const valueFilter = {
  precision: 1,
  type: OperatorOptions.CONCEPT,
  selectedConcepts: [],
}

const valueDefinition = {
  type: ValueType.CONCEPT,
  precision: 1,
}

const termEntryWithFilter: TerminologyEntry = {
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
  valueDefinition,
}

const criterion = new Criterion()
criterion.termCode = { code: 'A', system: 'http://test', display: 'Some Code' }
criterion.termEntry = termEntryWithFilter // new TermEntry2CriterionTranslator().translate(new MockBackendDataProvider().getTerminologyEntry('id'))
criterion.valueFilters = [valueFilter]

describe('EditCriterionComponent', () => {
  let component: EditCriterionComponent
  let fixture: ComponentFixture<EditCriterionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditCriterionComponent,
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        MatInputNumberDirective,
        ButtonComponent,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriterionComponent)
    component = fixture.componentInstance
    component.criterion = criterion

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
