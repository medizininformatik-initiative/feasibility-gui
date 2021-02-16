import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayCritGroupComponent } from './display-crit-group.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { QueryProviderService } from '../../service/query-provider.service'
import { MaterialModule } from '../../../../layout/material/material.module'
import { Criterion } from '../../model/api/query/criterion'

describe('DisplayCritGroupComponent', () => {
  let component: DisplayCritGroupComponent
  let fixture: ComponentFixture<DisplayCritGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
      declarations: [
        DisplayCritGroupComponent,
        DisplayCriterionComponent,
        BoolLogicSwitchComponent,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCritGroupComponent)
    component = fixture.componentInstance
    component.critGroup = new QueryProviderService().query().groups[0].inclusionCriteria
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  function createCriterion(code: string): Criterion {
    return {
      termCode: { code, display: code, system: code },
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
    spyOn(component.dropping, 'emit')

    const mockEvent = {
      previousContainer: { data: { a: 1 } },
      container: { data: { b: 2 } },
    }
    component.doDrop(mockEvent)

    expect(component.dropping.emit).toHaveBeenCalledWith({
      addMode: 'position',
      from: { a: 1 },
      to: { b: 2 },
    })
  })
})
