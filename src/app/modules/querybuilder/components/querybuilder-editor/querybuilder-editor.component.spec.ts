import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { QuerybuilderEditorComponent } from './querybuilder-editor.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { Component } from '@angular/core'
import { DisplayQueryComponent } from './display/display-query/display-query.component'
import { DisplayGroupComponent } from './display/display-group/display-group.component'
import { DisplayCritGroupComponent } from './display/display-crit-group/display-crit-group.component'
import { DisplayCriterionComponent } from './display/display-criterion/display-criterion.component'
import { BoolLogicSwitchComponent } from './display/bool-logic-switch/bool-logic-switch.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { QueryProviderService } from '../../service/query-provider.service'
import { SearchInputComponent } from './search/search-input/search-input.component'
import { SearchTreeOverlayComponent } from './search/search-tree-overlay/search-tree-overlay.component'
import { SearchTreeHeaderComponent } from './search/search-tree-header/search-tree-header.component'
import { SearchTreeFooterComponent } from './search/search-tree-footer/search-tree-footer.component'
import { SearchInputTermEntryComponent } from './search/search-input-term-entry/search-input-term-entry.component'
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
        SearchTreeOverlayComponent,
        SearchTreeHeaderComponent,
        SearchTreeFooterComponent,
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
