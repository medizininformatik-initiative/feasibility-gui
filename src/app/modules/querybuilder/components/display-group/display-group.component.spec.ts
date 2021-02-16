import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayGroupComponent } from './display-group.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DisplayCritGroupComponent } from '../display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { QueryProviderService } from '../../service/query-provider.service'
import { MaterialModule } from '../../../../layout/material/material.module'
import { Criterion } from '../../model/api/query/criterion'

describe('DisplayGroupComponent', () => {
  let component: DisplayGroupComponent
  let fixture: ComponentFixture<DisplayGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DisplayGroupComponent,
        DisplayCritGroupComponent,
        DisplayCriterionComponent,
        BoolLogicSwitchComponent,
      ],
      imports: [MaterialModule, FontAwesomeTestingModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGroupComponent)
    component = fixture.componentInstance
    component.group = new QueryProviderService().query().groups[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit dropping event (doDrop())', () => {
    spyOn(component.dropping, 'emit')

    const mockEvent = {
      a: 1,
    }
    component.doDrop(mockEvent)

    expect(component.dropping.emit).toHaveBeenCalledWith(mockEvent)
  })

  it('should emit dropping event (doDropAtEnd())', () => {
    spyOn(component.dropping, 'emit')

    const mockEvent = {
      previousContainer: { data: { a: 1 } },
      container: { data: { b: 2 } },
    }
    component.doDropAtEnd(mockEvent)

    expect(component.dropping.emit).toHaveBeenCalledWith({
      addMode: 'end',
      from: { a: 1 },
      to: { b: 2 },
    })
  })

  it('should store in inclusionCriteria', () => {
    const criterion = new Criterion()
    criterion.termCode = { code: 'a', system: 'b', display: 'c' }
    const critGroup: Criterion[][] = [[criterion]]
    component.switch('inclusion', critGroup)

    expect(component.group.inclusionCriteria).toBe(critGroup)
    expect(component.group.exclusionCriteria).toStrictEqual(
      new QueryProviderService().query().groups[0].exclusionCriteria
    )
  })

  it('should store in exclusionCriteria', () => {
    const criterion = new Criterion()
    criterion.termCode = { code: 'a', system: 'b', display: 'c' }
    const critGroup: Criterion[][] = [[criterion]]
    component.switch('exclusion', critGroup)

    expect(component.group.exclusionCriteria).toBe(critGroup)
    expect(component.group.inclusionCriteria).toStrictEqual(
      new QueryProviderService().query().groups[0].inclusionCriteria
    )
  })
})
