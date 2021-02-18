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
import { SearchInputComponent } from '../search-input/search-input.component'
import { SearchOverlayTreeComponent } from '../search-overlay-tree/search-overlay-tree.component'
import { SearchHeaderTreeComponent } from '../search-header-tree/search-header-tree.component'
import { SearchFooterTreeComponent } from '../search-footer-tree/search-footer-tree.component'
import { SearchInputTermEntryComponent } from '../search-input-term-entry/search-input-term-entry.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'

describe('QuerybuilderEditorComponent', () => {
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
        SearchInputComponent,
        SearchOverlayTreeComponent,
        SearchHeaderTreeComponent,
        SearchFooterTreeComponent,
        SearchInputTermEntryComponent,
        ButtonComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        OverlayModule,
        FormsModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    // Workaround: see https://github.com/thymikee/jest-preset-angular/issues/122
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => {
          return ''
        },
      }),
    })

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
