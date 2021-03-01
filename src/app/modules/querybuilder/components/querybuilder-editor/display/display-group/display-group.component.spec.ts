import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayGroupComponent } from './display-group.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DisplayCritGroupComponent } from '../display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { Criterion } from '../../../../model/api/query/criterion'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { CritGroupArranger } from '../../../../controller/CritGroupArranger'
import { Query } from '../../../../model/api/query/query'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'

describe('DisplayGroupComponent', () => {
  let component: DisplayGroupComponent
  let fixture: ComponentFixture<DisplayGroupComponent>

  const featureService = {
    useFeatureMultipleValueDefinitions(): boolean {
      return true
    },
  } as FeatureService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DisplayGroupComponent,
        DisplayCritGroupComponent,
        DisplayCriterionComponent,
        DisplayValueFilterComponent,
        BoolLogicSwitchComponent,
      ],
      imports: [
        MaterialModule,
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
    fixture = TestBed.createComponent(DisplayGroupComponent)
    component = fixture.componentInstance
    component.group = QueryProviderService.createTestQuery().groups[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit dropping event (doDrop())', () => {
    spyOn(component.dropped, 'emit')

    const mockEvent = {
      a: 1,
    }
    component.doDrop(mockEvent)

    expect(component.dropped.emit).toHaveBeenCalledWith(mockEvent)
  })

  it('should call remove on delete', () => {
    spyOn(CritGroupArranger, 'removeFromGroup')
    const groupBeforeAction = component.group

    component.doDelete({ row: 47, column: 11 }, 'exclusion')

    expect(CritGroupArranger.removeFromGroup).toHaveBeenCalledWith(groupBeforeAction, {
      row: 47,
      column: 11,
      critType: 'exclusion',
      groupId: groupBeforeAction.id,
    })
  })

  it('should save on delete', () => {
    spyOn(component.saveGroup, 'emit')
    const groupBeforeAction = component.group

    component.doDelete({ row: 0, column: 0 }, 'exclusion')

    expect(component.saveGroup.emit).not.toHaveBeenCalledWith(groupBeforeAction)
    expect(component.saveGroup.emit).toHaveBeenCalledWith(component.group)
  })

  it('should store in inclusionCriteria', () => {
    spyOn(component.storeQuery, 'emit')
    const criterion = new Criterion()
    criterion.termCode = { code: 'a', system: 'b', display: 'c' }
    const critGroup: Criterion[][] = [[criterion]]
    component.switch('inclusion', critGroup)

    expect(component.group.inclusionCriteria).toBe(critGroup)
    expect(component.group.exclusionCriteria).toStrictEqual(
      QueryProviderService.createTestQuery().groups[0].exclusionCriteria
    )
    expect(component.storeQuery.emit).toBeCalled()
  })

  it('should store in exclusionCriteria', () => {
    spyOn(component.storeQuery, 'emit')
    const criterion = new Criterion()
    criterion.termCode = { code: 'a', system: 'b', display: 'c' }
    const critGroup: Criterion[][] = [[criterion]]
    component.switch('exclusion', critGroup)

    expect(component.group.exclusionCriteria).toBe(critGroup)
    expect(component.group.inclusionCriteria).toStrictEqual(
      QueryProviderService.createTestQuery().groups[0].inclusionCriteria
    )
    expect(component.storeQuery.emit).toBeCalled()
  })

  it('should fire storeQuery event', () => {
    spyOn(component.storeQuery, 'emit')
    component.doStoreQuery(new Query())
    expect(component.storeQuery.emit).toBeCalled()
  })
})
