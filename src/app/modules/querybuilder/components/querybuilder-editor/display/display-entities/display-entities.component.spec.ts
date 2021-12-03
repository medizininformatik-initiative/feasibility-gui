import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayEntitiesComponent } from './display-entities.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { DisplayTimeRestrictionComponent } from '../display-time-restriction/display-time-restriction.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { Criterion } from '../../../../model/api/query/criterion'
import { TerminologyCode } from '../../../../model/api/terminology/terminology'

describe('DisplayEntitiesComponent', () => {
  let component: DisplayEntitiesComponent
  let fixture: ComponentFixture<DisplayEntitiesComponent>
  const EntityConcept: Criterion = {
    children: [],
    termCodes: [],
    display: '',
    valueFilters: [],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DisplayEntitiesComponent,
        DisplayCriterionComponent,
        BoolLogicSwitchComponent,
        DisplayValueFilterComponent,
        DisplayTimeRestrictionComponent,
      ],
      imports: [MaterialModule, TranslateModule.forRoot(), FormsModule, FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEntitiesComponent)
    component = fixture.componentInstance
  })

  describe('create component', () => {
    it('should create for empty Entity', () => {
      component.criterionEntity = EntityConcept

      fixture.detectChanges()
      expect(component).toBeTruthy()
    })
  })
})
