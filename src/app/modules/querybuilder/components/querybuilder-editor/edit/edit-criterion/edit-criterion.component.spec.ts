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
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'
import { EditTimeRestrictionComponent } from '../edit-time-restriction/edit-time-restriction.component'
import { QueryProviderService } from '../../../../service/query-provider.service'

describe('EditCriterionComponent', () => {
  let component: EditCriterionComponent
  let fixture: ComponentFixture<EditCriterionComponent>

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

  const valueFilter2 = {
    precision: 2,
    type: OperatorOptions.CONCEPT,
    selectedConcepts: [],
    valueDefinition,
  }

  const criterion = new Criterion()
  criterion.termCode = { code: 'A', system: 'http://test', display: 'Some Code' }
  criterion.valueFilters = [valueFilter]

  const featureService = {
    useFeatureMultipleValueDefinitions(): boolean {
      return true
    },
    useFeatureTimeRestriction(): boolean {
      return true
    },
    useFeatureMultipleGroups(): boolean {
      return true
    },
    useFeatureDependentGroups(): boolean {
      return true
    },
  } as FeatureService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditCriterionComponent,
        EditValueFilterComponent,
        EditValueFilterConceptLineComponent,
        MatInputNumberDirective,
        ButtonComponent,
        EditTimeRestrictionComponent,
      ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: FeatureService,
          useValue: featureService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriterionComponent)
    component = fixture.componentInstance
    component.criterion = criterion
    component.query = QueryProviderService.createTestQuery()

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

    component.selectedGroupId = 47
    component.doSave()
    expect(component.save.emit).toHaveBeenCalledWith({ groupId: 47 })
  })

  it('should not fire save event for disabled state', () => {
    spyOn(component.save, 'emit')
    jest.spyOn(component, 'isActionDisabled').mockReturnValue(true)

    component.doSave()
    expect(component.save.emit).not.toHaveBeenCalledWith()
  })

  it('should use all available filters', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(true)
    component.featureService = featureService

    component.criterion.valueFilters.push(valueFilter2)

    expect(component.getValueFilters().length).toBe(2)
  })

  it('should use only the first value filter', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(false)
    component.featureService = featureService

    component.criterion.valueFilters.push(valueFilter2)

    expect(component.getValueFilters().length).toBe(1)
  })

  it('should use one value filter', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(false)
    component.featureService = featureService

    expect(component.getValueFilters().length).toBe(1)
  })

  it('should use no value filter', () => {
    spyOn(featureService, 'useFeatureMultipleValueDefinitions').and.returnValue(false)
    component.featureService = featureService

    component.criterion.valueFilters = []

    expect(component.getValueFilters().length).toBe(0)
  })
})
