import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayCritGroupComponent } from './display-crit-group.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { Criterion } from '../../../../model/api/query/criterion'
import { EditValueFilterConceptLineComponent } from '../../edit/edit-value-filter-concept-line/edit-value-filter-concept-line.component'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { ReactiveFormsModule } from '@angular/forms'
import { Query } from '../../../../model/api/query/query'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'
import { DisplayTimeRestrictionComponent } from '../display-time-restriction/display-time-restriction.component'
import { OAuthStorage } from 'angular-oauth2-oidc'

describe('DisplayCritGroupComponent', () => {
  let component: DisplayCritGroupComponent
  let fixture: ComponentFixture<DisplayCritGroupComponent>

  beforeEach(async () => {
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

    const authStorage = {
      getItem: (accessToken: string) => 'test_token',
    } as OAuthStorage

    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      declarations: [
        DisplayCritGroupComponent,
        DisplayCriterionComponent,
        DisplayValueFilterComponent,
        EditValueFilterConceptLineComponent,
        BoolLogicSwitchComponent,
        DisplayTimeRestrictionComponent,
      ],
      providers: [
        { provide: OAuthStorage, useValue: authStorage },
        {
          provide: FeatureService,
          useValue: featureService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCritGroupComponent)
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

  it('should emit dropping event', () => {
    spyOn(component.dropped, 'emit')

    const mockEvent = {
      previousContainer: { data: { a: 1 } },
      container: { data: { b: 2 } },
    }
    component.doDrop(mockEvent)

    expect(component.dropped.emit).toHaveBeenCalledWith({
      addMode: 'position',
      from: { a: 1 },
      to: { b: 2 },
    })
  })

  it('should emit dropping event (doDropAtEnd())', () => {
    spyOn(component.dropped, 'emit')

    const mockEvent = {
      previousContainer: { data: { a: 1 } },
      container: { data: { b: 2 } },
    }
    component.doDropAtEnd(mockEvent)

    expect(component.dropped.emit).toHaveBeenCalledWith({
      addMode: 'end',
      from: { a: 1 },
      to: { b: 2 },
    })
  })

  it('should fire storeQuery event', () => {
    spyOn(component.storeQuery, 'emit')
    component.doStoreQuery(new Query())
    expect(component.storeQuery.emit).toBeCalled()
  })

  it('should fire delete event', () => {
    spyOn(component.delete, 'emit')
    component.doDelete({ row: 47, column: 11 })
    expect(component.delete.emit).toHaveBeenCalledWith({ row: 47, column: 11 })
  })
})
