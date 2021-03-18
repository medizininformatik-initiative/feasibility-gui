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
import { Query } from '../../../../model/api/query/query'
import { ObjectHelper } from '../../../../controller/ObjectHelper'

describe('EditCriterionComponent', () => {
  let component: EditCriterionComponent
  let fixture: ComponentFixture<EditCriterionComponent>

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

  const testBedConfig = {
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
  }

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

  const valueFilter2 = {
    precision: 2,
    type: OperatorOptions.CONCEPT,
    selectedConcepts: [],
    valueDefinition,
  }

  const query: Query = {
    display: '',
    groups: [
      {
        id: 1,
        display: '',
        inclusionCriteria: [[criterion]],
        exclusionCriteria: [],
      },
      {
        id: 2,
        display: '',
        inclusionCriteria: [],
        exclusionCriteria: [],
      },
    ],
  }

  describe('default test bed config', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule(testBedConfig).compileComponents()

      fixture = TestBed.createComponent(EditCriterionComponent)
      component = fixture.componentInstance
      component.criterion = criterion
      component.query = ObjectHelper.clone(query)
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

    it('should use group id from position on ngInit()', () => {
      component.query.groups[0].id = 27
      component.position = { groupId: 13, critType: 'exclusion', row: 1, column: 1 }

      fixture.detectChanges()

      expect(component.selectedGroupId).toBe(13)
    })

    it('should use group id from first group on ngInit()', () => {
      component.query.groups[0].id = 27
      component.position = undefined

      fixture.detectChanges()

      expect(component.selectedGroupId).toBe(27)
    })

    describe('test moveBetweenGroups', () => {
      it('should move criterion to second group', () => {
        component.selectedGroupId = 2
        component.position = {
          groupId: 1,
          critType: 'inclusion',
          row: 0,
          column: 0,
        }

        component.moveBetweenGroups()

        expect(component.query.groups[0].inclusionCriteria).toEqual([])
        expect(component.query.groups[1].inclusionCriteria).toEqual([[criterion]])
      })

      it('should not move criterion to second group (missing position)', () => {
        component.selectedGroupId = 2
        component.position = null

        component.moveBetweenGroups()

        expect(component.query.groups[0].inclusionCriteria).toEqual([[criterion]])
        expect(component.query.groups[1].inclusionCriteria).toEqual([])
      })

      it('should not move criterion to second group (selected group id equals original group id)', () => {
        component.selectedGroupId = 1
        component.position = {
          groupId: 1,
          critType: 'inclusion',
          row: 0,
          column: 0,
        }

        component.moveBetweenGroups()

        expect(component.query.groups[0].inclusionCriteria).toEqual([[criterion]])
        expect(component.query.groups[1].inclusionCriteria).toEqual([])
      })

      it('should not move criterion to second group (row is missing)', () => {
        component.selectedGroupId = 1
        component.position = {
          groupId: 2,
          critType: 'inclusion',
          row: null,
          column: 0,
        }

        component.moveBetweenGroups()

        expect(component.query.groups[0].inclusionCriteria).toEqual([[criterion]])
        expect(component.query.groups[1].inclusionCriteria).toEqual([])
      })

      it('should not move criterion to second group (column is missing)', () => {
        component.selectedGroupId = 1
        component.position = {
          groupId: 2,
          critType: 'inclusion',
          row: 0,
          column: null,
        }

        component.moveBetweenGroups()

        expect(component.query.groups[0].inclusionCriteria).toEqual([[criterion]])
        expect(component.query.groups[1].inclusionCriteria).toEqual([])
      })
    })
  })
})
