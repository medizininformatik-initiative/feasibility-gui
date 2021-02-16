import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { QuerybuilderEditorComponent } from './querybuilder-editor.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { Component } from '@angular/core'
import { DisplayQueryComponent } from '../display-query/display-query.component'
import { DisplayGroupComponent } from '../display-group/display-group.component'
import { DisplayCritGroupComponent } from '../display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from '../display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from '../bool-logic-switch/bool-logic-switch.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { QueryProviderService } from '../../service/query-provider.service'

describe('AdminComponent', () => {
  let component: QuerybuilderEditorComponent
  let fixture: ComponentFixture<QuerybuilderEditorComponent>

  @Component({ selector: 'num-unapproved-users-table', template: '' })
  class UserTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        QuerybuilderEditorComponent,
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
    fixture = TestBed.createComponent(QuerybuilderEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call storage service', () => {
    spyOn(component.queryProviderService, 'store')

    const query = QueryProviderService.createTestQuery()

    component.storeQuery(query)

    expect(component.queryProviderService.store).toHaveBeenCalledTimes(1)
    expect(component.queryProviderService.store).toHaveBeenCalledWith(query)
  })
})
