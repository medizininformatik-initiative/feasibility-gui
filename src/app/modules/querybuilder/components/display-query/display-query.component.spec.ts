import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayQueryComponent } from './display-query.component'
import { DisplayGroupComponent } from '../display-group/display-group.component'
import { DisplayCritGroupComponent } from '../display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { QueryProviderService } from '../../service/query-provider.service'
import { MaterialModule } from '../../../../layout/material/material.module'
import { CritGroupArranger, CritGroupPosition } from '../../controller/CritGroupArranger'

describe('DisplayQueryComponent', () => {
  let component: DisplayQueryComponent
  let fixture: ComponentFixture<DisplayQueryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DisplayQueryComponent,
        DisplayGroupComponent,
        DisplayCritGroupComponent,
        DisplayCriterionComponent,
        BoolLogicSwitchComponent,
      ],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
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

    const from: CritGroupPosition = { groupId: '123', mode: 'inclusion', row: 1, column: 2 }
    const to: CritGroupPosition = { groupId: '123', mode: 'inclusion', row: 2, column: 3 }
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

    const from: CritGroupPosition = { groupId: '123', mode: 'inclusion', row: 1, column: 2 }
    const to: CritGroupPosition = { groupId: '123', mode: 'inclusion', row: 2, column: 3 }
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
})
