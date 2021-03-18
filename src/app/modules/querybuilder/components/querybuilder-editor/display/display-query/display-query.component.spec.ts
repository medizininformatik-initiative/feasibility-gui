import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayQueryComponent } from './display-query.component'
import { DisplayGroupComponent } from '../display-group/display-group.component'
import { DisplayCritGroupComponent } from '../display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { CritGroupArranger, CritGroupPosition } from '../../../../controller/CritGroupArranger'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { Group } from '../../../../model/api/query/group'
import { Query } from '../../../../model/api/query/query'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../../../service/feature.service'
import { DisplayTimeRestrictionComponent } from '../display-time-restriction/display-time-restriction.component'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { GroupFactory } from '../../../../controller/GroupFactory'

describe('DisplayQueryComponent', () => {
  let component: DisplayQueryComponent
  let fixture: ComponentFixture<DisplayQueryComponent>

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      declarations: [
        DisplayQueryComponent,
        DisplayGroupComponent,
        DisplayCritGroupComponent,
        DisplayCriterionComponent,
        DisplayValueFilterComponent,
        BoolLogicSwitchComponent,
        DisplayTimeRestrictionComponent,
        ButtonComponent,
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
    fixture = TestBed.createComponent(DisplayQueryComponent)
    component = fixture.componentInstance
    component.query = QueryProviderService.createTestQuery()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should move criterion to new position', () => {
    spyOn(CritGroupArranger, 'moveCriterion')
    spyOn(CritGroupArranger, 'moveCriterionToEndOfGroup')

    const from: CritGroupPosition = { groupId: 123, critType: 'inclusion', row: 1, column: 2 }
    const to: CritGroupPosition = { groupId: 123, critType: 'inclusion', row: 2, column: 3 }
    const mockEvent = { addMode: 'position', from, to }
    const groupsParameter = component.query.groups

    component.doDrop(mockEvent)

    expect(CritGroupArranger.moveCriterionToEndOfGroup).toHaveBeenCalledTimes(0)
    expect(CritGroupArranger.moveCriterion).toHaveBeenCalledTimes(1)
    expect(CritGroupArranger.moveCriterion).toHaveBeenCalledWith(groupsParameter, from, to)
  })

  it('should move criterion to end of crit-group', () => {
    spyOn(CritGroupArranger, 'moveCriterion')
    spyOn(CritGroupArranger, 'moveCriterionToEndOfGroup')

    const from: CritGroupPosition = { groupId: 123, critType: 'inclusion', row: 1, column: 2 }
    const to: CritGroupPosition = { groupId: 123, critType: 'inclusion', row: 2, column: 3 }
    const mockEvent = { addMode: 'end', from, to }
    const groupsParameter = component.query.groups

    component.doDrop(mockEvent)

    expect(CritGroupArranger.moveCriterionToEndOfGroup).toHaveBeenCalledTimes(1)
    expect(CritGroupArranger.moveCriterion).toHaveBeenCalledTimes(0)
    expect(CritGroupArranger.moveCriterionToEndOfGroup).toHaveBeenCalledWith(
      groupsParameter,
      from,
      to
    )
  })

  it('should do nothing for call on non-existing group', () => {
    spyOn(component.storeQuery, 'emit')
    const groupBeforeAction = component.query.groups[0]
    const groupParameter = new Group()
    groupParameter.id = 4711

    component.doSaveGroup(groupParameter)

    expect(component.query.groups[0]).toBe(groupBeforeAction)
    expect(component.storeQuery.emit).not.toHaveBeenCalled()
  })

  it('should replace existing group', () => {
    spyOn(component.storeQuery, 'emit')
    const groupBeforeAction = component.query.groups[0]
    const groupParameter = new Group()
    groupParameter.id = groupBeforeAction.id

    component.doSaveGroup(groupParameter)

    expect(component.query.groups[0]).toEqual(groupParameter)
    expect(component.query.groups[0]).not.toEqual(groupBeforeAction)
    expect(component.storeQuery.emit).toHaveBeenCalledWith(component.query)
  })

  it('should fire storeQuery event', () => {
    spyOn(component.storeQuery, 'emit')
    component.doStoreQuery(new Query())
    expect(component.storeQuery.emit).toBeCalled()
  })

  it('should add group', () => {
    const query = new Query()
    query.groups = [new Group(), new Group()]
    component.query = query
    component.addGroup()

    expect(component.query.groups.length).toBe(3)
  })

  it('should find only one group', () => {
    jest.spyOn(component.featureService, 'useFeatureMultipleGroups').mockReturnValue(false)
    const query = { groups: [] } as Query
    createGroups(1).forEach((group) => query.groups.push(group))
    createGroups(2).forEach((group) => query.groups.push(group))
    component.query = query

    expect(component.getGroups()).toEqual([createGroup(1)])
  })

  it('should find all groups', () => {
    jest.spyOn(component.featureService, 'useFeatureMultipleGroups').mockReturnValue(true)
    const query = { groups: [] } as Query
    createGroups(1).forEach((group) => query.groups.push(group))
    createGroups(2).forEach((group) => query.groups.push(group))
    component.query = query

    expect(component.getGroups()).toEqual([createGroup(1), createGroup(2)])
  })

  it('should normalize to first group with index 0', () => {
    expect(component.findIndexOfPreviousGroupWithoutConnectedParent(-1)).toBe(0)
  })

  it('should not find parent group of first group', () => {
    expect(component.getParentGroup(0)).toBe(null)
  })

  it('should not find parent group for non-linked group', () => {
    const query = { groups: [] } as Query
    createGroups(1).forEach((group) => query.groups.push(group))
    createGroups(2).forEach((group) => query.groups.push(group))
    component.query = query

    expect(component.getParentGroup(1)).toBe(null)
  })

  it('should find parent group for linked group', () => {
    const query = { groups: [] } as Query
    createGroups(1, 2).forEach((group) => query.groups.push(group))
    component.query = query

    expect(component.getParentGroup(1)).toEqual(createGroup(1))
  })

  function createGroups(...ids: number[]): Group[] {
    const groups: Group[] = []

    ids.forEach((id) => groups.push(createGroup(id)))
    for (let index = 0; index < groups.length - 1; index++) {
      groups[index + 1].dependencyInfo = GroupFactory.createGroupDependencyInfo()
      groups[index + 1].dependencyInfo.linked = true
    }

    return groups
  }

  function createGroup(id: number): Group {
    const group = new Group()
    group.id = id
    return group
  }

  describe('move groups', () => {
    beforeEach(() => {
      const query = { groups: [] } as Query
      createGroups(1, 2, 3).forEach((group) => query.groups.push(group))
      createGroups(4).forEach((group) => query.groups.push(group))
      createGroups(5, 6).forEach((group) => query.groups.push(group))
      component.query = query
    })

    function extractIds(): number[] {
      const ids = []
      component.query.groups.forEach((group) => ids.push(group.id))
      return ids
    }

    it('should move three linked groups down', () => {
      component.doMoveDown(0)
      expect(extractIds()).toEqual([4, 1, 2, 3, 5, 6])
    })

    it('should move partial subgroup', () => {
      component.doMoveDown(1)
      expect(extractIds()).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('should move one linked group down', () => {
      component.doMoveDown(3)
      expect(extractIds()).toEqual([1, 2, 3, 5, 6, 4])
    })

    it('should not move last linked complete group down', () => {
      component.doMoveDown(4)
      expect(extractIds()).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('should not move last partial linked subgroup down', () => {
      component.doMoveDown(5)
      expect(extractIds()).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('should not move first complete linked groups up', () => {
      component.doMoveUp(0)
      expect(extractIds()).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('should not move first partial linked subgroup up', () => {
      component.doMoveUp(1)
      expect(extractIds()).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('should move one linked group up', () => {
      component.doMoveUp(3)
      expect(extractIds()).toEqual([4, 1, 2, 3, 5, 6])
    })

    it('should move last linked complete group up', () => {
      component.doMoveUp(4)
      expect(extractIds()).toEqual([1, 2, 3, 5, 6, 4])
    })

    it('should not move last partial linked subgroup up', () => {
      component.doMoveUp(5)
      expect(extractIds()).toEqual([1, 2, 3, 4, 5, 6])
    })
  })
})
