import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayCriterionComponent } from './display-criterion.component'
import { QueryProviderService } from '../../service/query-provider.service'

describe('DisplayCriterionComponent', () => {
  let component: DisplayCriterionComponent
  let fixture: ComponentFixture<DisplayCriterionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCriterionComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCriterionComponent)
    component = fixture.componentInstance
    component.criterion = new QueryProviderService().query().groups[0].inclusionCriteria[0][0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
