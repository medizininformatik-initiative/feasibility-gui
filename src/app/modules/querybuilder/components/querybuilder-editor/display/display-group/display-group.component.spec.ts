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
import { DisplayTimeRestrictionComponent } from '../display-time-restriction/display-time-restriction.component'
import { Group, GroupDependencyInfo } from '../../../../model/api/query/group'
import { Observable, of } from 'rxjs'
import { MatDialogRef } from '@angular/material/dialog'
import { EditGroupConnectionComponent } from '../../edit/edit-group-connection/edit-group-connection.component'
import anything = jasmine.anything

describe('DisplayGroupComponent', () => {
  let component: DisplayGroupComponent
  let fixture: ComponentFixture<DisplayGroupComponent>

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
    useFeatureShowDisplayValueFilterIcon(): boolean {
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
        DisplayTimeRestrictionComponent,
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
    component.query = QueryProviderService.createTestQuery()
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

  it('should fire moveDown event', () => {
    spyOn(component.moveDown, 'emit')
    component.doMoveDown()
    expect(component.moveDown.emit).toBeCalled()
  })

  it('should fire moveUp event', () => {
    spyOn(component.moveUp, 'emit')
    component.doMoveUp()
    expect(component.moveUp.emit).toBeCalled()
  })

  it('should show hint on not deleting group', () => {
    spyOn(component.snackBar, 'open')
    component.showHintNotDeletedLinkedParentGroup()
    expect(component.snackBar.open).toBeCalled()
  })

  it('should add dependency info', () => {
    jest.spyOn(component.storeQuery, 'emit')
    component.group = component.query.groups[0]
    component.group.dependencyInfo = undefined

    component.switchLinkedStatus()
    expect(component.query.groups[0].dependencyInfo.linked).toBe(true)
    expect(component.storeQuery.emit).toBeCalledWith(component.query)
  })

  it('should switch to linked group', () => {
    jest.spyOn(component.storeQuery, 'emit')
    component.group = component.query.groups[0]
    component.group.dependencyInfo = new GroupDependencyInfo()

    component.switchLinkedStatus()
    expect(component.query.groups[0].dependencyInfo.linked).toBe(true)
    expect(component.storeQuery.emit).toBeCalledWith(component.query)
  })

  it('should switch to unlinked group', () => {
    jest.spyOn(component.storeQuery, 'emit')
    component.group = component.query.groups[0]
    component.group.dependencyInfo = new GroupDependencyInfo()
    component.group.dependencyInfo.linked = true

    component.switchLinkedStatus()
    expect(component.query.groups[0].dependencyInfo.linked).toBe(false)
    expect(component.storeQuery.emit).toBeCalledWith(component.query)
  })

  it('should open dialog for editing group connection', () => {
    const newQuery = new Query()
    newQuery.display = 'Test'

    const dialogRef = {
      afterClosed(): Observable<any | undefined> {
        return of(newQuery)
      },
    } as MatDialogRef<EditGroupConnectionComponent>

    jest.spyOn(component.dialog, 'open').mockReturnValue(dialogRef)
    jest.spyOn(component.storeQuery, 'emit')

    component.editConnection()

    expect(component.dialog.open).toBeCalledWith(EditGroupConnectionComponent, anything())
    expect(component.storeQuery.emit).toBeCalledWith(newQuery)
  })

  describe('deleteGroup()', () => {
    const groupsInitial = [
      createGroup(1),
      createGroup(2, true),
      createGroup(3, true),
      createGroup(4),
    ]

    function createGroup(id: number, linked?: boolean): Group {
      const group = new Group()
      group.id = id

      if (linked) {
        group.dependencyInfo = new GroupDependencyInfo()
        group.dependencyInfo.linked = linked
      }
      return group
    }

    beforeEach(() => {
      jest.spyOn(component.storeQuery, 'emit')
      component.query.groups = groupsInitial
    })

    it('should not delete a group which is linked to a child', () => {
      component.deleteGroup(1)
      expect(component.query.groups).toEqual(groupsInitial)
      expect(component.storeQuery.emit).not.toBeCalled()
    })

    it('should not delete a group which is linked to a child and a parent', () => {
      component.deleteGroup(2)
      expect(component.query.groups).toEqual(groupsInitial)
      expect(component.storeQuery.emit).not.toBeCalled()
    })

    it('should delete a group which is linked to a parent but not a child', () => {
      component.deleteGroup(3)
      expect(component.query.groups).toEqual([createGroup(1), createGroup(2, true), createGroup(4)])
      expect(component.storeQuery.emit).toBeCalledWith(component.query)
    })

    it('should delete a group which is not linked to a parent and not linked to a child', () => {
      component.deleteGroup(4)
      expect(component.query.groups).toEqual([
        createGroup(1),
        createGroup(2, true),
        createGroup(3, true),
      ])
      expect(component.storeQuery.emit).toBeCalledWith(component.query)
    })
  })
})
