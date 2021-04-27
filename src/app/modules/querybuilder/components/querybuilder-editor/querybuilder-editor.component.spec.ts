import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
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
import { SearchTreeOverlayContentComponent } from './search/search-tree-overlay-content/search-tree-overlay-content.component'
import { SearchTreeHeaderComponent } from './search/search-tree-header/search-tree-header.component'
import { SearchTreeFooterComponent } from './search/search-tree-footer/search-tree-footer.component'
import { SearchTreeTermEntryComponent } from './search/search-tree-term-entry/search-tree-term-entry.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { SearchTextOverlayContentComponent } from './search/search-text-overlay-content/search-text-overlay-content.component'
import { SearchTextHeaderComponent } from './search/search-text-header/search-text-header.component'
import { SearchTextTermEntryComponent } from './search/search-text-term-entry/search-text-term-entry.component'
import { DisplayValueFilterComponent } from './display/display-value-filter/display-value-filter.component'
import { EditTimeRestrictionComponent } from './edit/edit-time-restriction/edit-time-restriction.component'
import { DisplayTimeRestrictionComponent } from './display/display-time-restriction/display-time-restriction.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FeatureService } from '../../../../service/feature.service'
import { ResultSimpleComponent } from './result/result-simple/result-simple.component'
import { BackendService } from '../../service/backend.service'
import { Observable, of } from 'rxjs'
import { QueryResult } from '../../model/api/result/QueryResult'
import { QueryResponse } from '../../model/api/result/QueryResponse'
import { Query } from '../../model/api/query/query'
import { Group } from '../../model/api/query/group'

describe('QuerybuilderEditorComponent', () => {
  let component: QuerybuilderEditorComponent
  let fixture: ComponentFixture<QuerybuilderEditorComponent>

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
    getPollingTime(): number {
      return 300
    },
    getPollingIntervall(): number {
      return 1
    },
  } as FeatureService

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
        DisplayValueFilterComponent,
        BoolLogicSwitchComponent,
        SearchInputComponent,
        SearchTreeOverlayContentComponent,
        SearchTextOverlayContentComponent,
        SearchTextTermEntryComponent,
        SearchTreeHeaderComponent,
        SearchTextHeaderComponent,
        SearchTreeFooterComponent,
        SearchTreeTermEntryComponent,
        ButtonComponent,
        EditTimeRestrictionComponent,
        DisplayTimeRestrictionComponent,
        ResultSimpleComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        OverlayModule,
        FormsModule,
        FlexLayoutModule,
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
    // Workaround: see https://github.com/thymikee/jest-preset-angular/issues/122
    // noinspection JSUnusedLocalSymbols
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

  it('reset query', () => {
    jest.spyOn(component.queryProviderService, 'store')

    const expectedQuery = QueryProviderService.createDefaultQuery()
    const originalQuery = new Query()
    originalQuery.display = 'TEST'
    component.query = originalQuery

    component.doReset()

    expect(component.query).toEqual(expectedQuery)
    expect(component.queryProviderService.store).toBeCalledWith(expectedQuery)
  })

  it('should add group', () => {
    const query = new Query()
    query.groups = [new Group(), new Group()]
    component.query = query
    component.addGroup()

    expect(component.query.groups.length).toBe(3)
  })

  describe('polling results', () => {
    const resultUrl = 'http://test'
    const queryResult = { totalNumberOfPatients: 13, queryId: '1', resultLines: [] }
    let backendService

    beforeEach(() => {
      backendService = {
        getResult(resultUrlTemp: string): Observable<QueryResult> {
          return null
        },
        postQuery(query: Query): Observable<QueryResponse> {
          return null
        },
      } as BackendService
      component.backend = backendService
    })

    it('should start polling query results', fakeAsync(() => {
      const location = 'http://result/1'
      jest.spyOn(backendService, 'postQuery').mockReturnValue(of({ location }))
      jest.spyOn(backendService, 'getResult').mockReturnValue(of(queryResult))

      component.doSend()
      tick(5000)
      component.subscriptionPolling.unsubscribe()

      expect(component.resultUrl).toEqual(location)
      expect(backendService.getResult).toBeCalledTimes(5)
      expect(component.result).toEqual(queryResult)
    }))

    it('should set resultUrl and start polling query results', fakeAsync(() => {
      jest.spyOn(backendService, 'getResult').mockReturnValue(of(queryResult))

      component.startRequestingResult(resultUrl)
      tick(5000)
      component.subscriptionPolling.unsubscribe()

      expect(component.resultUrl).toEqual(resultUrl)
      expect(backendService.getResult).toBeCalledTimes(5)
      expect(component.result).toEqual(queryResult)
    }))

    it('should reset result url after 5 minutes', fakeAsync(() => {
      jest.spyOn(backendService, 'getResult').mockReturnValue(of(queryResult))

      component.startRequestingResult(resultUrl)
      tick(500000)
      component.subscriptionPolling.unsubscribe()

      // expect(component.resultUrl).toEqual('')
      expect(backendService.getResult).toBeCalledTimes(299)
      expect(component.result).toEqual(queryResult)
    }))

    it('should log an error', fakeAsync(() => {
      jest.spyOn(backendService, 'getResult').mockImplementation(() => {
        throw new Error()
      })
      jest.spyOn(console, 'error').mockImplementation(() => undefined)

      component.startRequestingResult(resultUrl)
      tick(5000)
      component.subscriptionPolling.unsubscribe()

      expect(component.resultUrl).toEqual(resultUrl)
      expect(console.error).toBeCalled()
      expect(backendService.getResult).toBeCalledTimes(1)
      expect(component.result).toEqual(undefined)
    }))
  })
})
