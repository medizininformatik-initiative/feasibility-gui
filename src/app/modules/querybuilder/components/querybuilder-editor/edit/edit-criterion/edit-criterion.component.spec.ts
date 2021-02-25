import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditCriterionComponent } from './edit-criterion.component'
import { EditValueFilterComponent } from '../edit-value-filter/edit-value-filter.component'
import { MatInputNumberDirective } from '../mat-input-number.directive'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { Criterion } from '../../../../model/api/query/criterion'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { EditValueFilterConceptLineComponent } from '../edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { OperatorOptions } from '../../../../model/api/query/valueFilter'
import { ValueType } from '../../../../model/api/terminology/valuedefinition'

const valueDefinition = {
  type: ValueType.CONCEPT,
  precision: 1,
}

const valueFilter = {
  precision: 1,
  type: OperatorOptions.CONCEPT,
  selectedConcepts: [],
  valueDefinition,
}

const criterion = new Criterion()
criterion.termCode = { code: 'A', system: 'http://test', display: 'Some Code' }
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

  it('should fire discard event', () => {
    spyOn(component.discard, 'emit')
    component.doDiscard()
    expect(component.discard.emit).toHaveBeenCalledWith()
  })

  it('should fire save event', () => {
    spyOn(component.save, 'emit')
    jest.spyOn(component, 'isActionDisabled').mockReturnValue(false)

    component.doSave()
    expect(component.save.emit).toHaveBeenCalledWith()
  })

  it('should not fire save event for disabled state', () => {
    spyOn(component.save, 'emit')
    jest.spyOn(component, 'isActionDisabled').mockReturnValue(true)

    component.doSave()
    expect(component.save.emit).not.toHaveBeenCalledWith()
  })
})
