import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DisplayCritGroupViewonlyComponent } from './display-crit-group-viewonly.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { EditValueFilterConceptLineComponent } from '../../edit/edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { DisplayTimeRestrictionComponent } from '../display-time-restriction/display-time-restriction.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { Criterion } from '../../../../model/api/query/criterion'
import { FeatureService } from '../../../../../../service/feature.service'

describe('DisplayCritGroupViewonlyComponent', () => {
  let component: DisplayCritGroupViewonlyComponent
  let fixture: ComponentFixture<DisplayCritGroupViewonlyComponent>

  const featureService = {
    useFeatureMultipleValueDefinitions(): boolean {
      return true
    },
    useFeatureTimeRestriction(): boolean {
      return true
    },
    useFeatureShowDisplayValueFilterIcon(): boolean {
      return true
    },
    getPatientResultLowerBoundary(): number {
      return 0
    },
  } as FeatureService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      declarations: [
        DisplayCritGroupViewonlyComponent,
        DisplayCriterionComponent,
        DisplayValueFilterComponent,
        EditValueFilterConceptLineComponent,
        BoolLogicSwitchComponent,
        DisplayTimeRestrictionComponent,
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
    fixture = TestBed.createComponent(DisplayCritGroupViewonlyComponent)
    component = fixture.componentInstance
    component.critGroup = QueryProviderService.createTestQuery().groups[0].inclusionCriteria
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  function createCriterion(code: string): Criterion {
    return {
      display: 'arbitrary',
      termCodes: [{ code, display: code, system: code }],
      valueFilters: [],
    }
  }

  it('should split inner array', () => {
    const criterionA = createCriterion('a')
    const criterionB = createCriterion('b')

    component.critGroup = [[criterionA, criterionB]]

    const expectedCritGroup = [[criterionA], [criterionB]]

    component.splitInnerArray(0, 0)
    expect(component.critGroup).toStrictEqual(expectedCritGroup)
  })

  it('should join inner array', () => {
    const criterionA = createCriterion('a')
    const criterionB = createCriterion('b')

    component.critGroup = [[criterionA], [criterionB]]

    const expectedCritGroup = [[criterionA, criterionB]]

    component.joinInnerArrays(0)
    expect(component.critGroup).toStrictEqual(expectedCritGroup)
  })
})
