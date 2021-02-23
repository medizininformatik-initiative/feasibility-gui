import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayCriterionComponent } from './display-criterion.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'

describe('DisplayCriterionComponent', () => {
  let component: DisplayCriterionComponent
  let fixture: ComponentFixture<DisplayCriterionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCriterionComponent, DisplayValueFilterComponent],
      imports: [MaterialModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCriterionComponent)
    component = fixture.componentInstance
    component.criterion = QueryProviderService.createTestQuery().groups[0].inclusionCriteria[0][0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
