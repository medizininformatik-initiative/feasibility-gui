import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchInputComponent } from './search-input.component'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { SearchTreeOverlayContentComponent } from '../search-tree-overlay-content/search-tree-overlay-content.component'
import { SearchTreeHeaderComponent } from '../search-tree-header/search-tree-header.component'
import { SearchTreeFooterComponent } from '../search-tree-footer/search-tree-footer.component'
import { SearchTreeTermEntryComponent } from '../search-tree-term-entry/search-tree-term-entry.component'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Observable, of } from 'rxjs'
import { CategoryEntry, TerminologyEntry } from '../../../../model/api/terminology/terminology'
import { BackendService } from '../../../../service/backend.service'
import { SearchTextHeaderComponent } from '../search-text-header/search-text-header.component'
import { SearchTextOverlayContentComponent } from '../search-text-overlay-content/search-text-overlay-content.component'
import { MockBackendDataProvider } from '../../../../service/MockBackendDataProvider'
import { SearchTextTermEntryComponent } from '../search-text-term-entry/search-text-term-entry.component'
import { Query } from '../../../../model/api/query/query'

describe('SearchInputComponent', () => {
  let component: SearchInputComponent
  let fixture: ComponentFixture<SearchInputComponent>

  beforeEach(async () => {
    const backendService = {
      getCategories(): Observable<Array<CategoryEntry>> {
        return of([new CategoryEntry()])
      },
      getTerminolgyEntrySearchResult(
        catId: string,
        search: string
      ): Observable<Array<TerminologyEntry>> {
        return of(new MockBackendDataProvider().getTerminolgyEntrySearchResult(catId, search))
      },
    } as BackendService

    await TestBed.configureTestingModule({
      declarations: [
        SearchInputComponent,
        SearchTreeOverlayContentComponent,
        SearchTextOverlayContentComponent,
        SearchTextHeaderComponent,
        SearchTextTermEntryComponent,
        SearchTreeHeaderComponent,
        SearchTreeFooterComponent,
        SearchTreeTermEntryComponent,
        ButtonComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MaterialModule,
        OverlayModule,
        FormsModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: BackendService, useValue: backendService }],
    }).compileComponents()
  })

  beforeEach(() => {
    // Workaround: see https://github.com/telerik/kendo-angular/issues/1505
    // noinspection JSUnusedLocalSymbols
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => {
          return ''
        },
      }),
    })

    fixture = TestBed.createComponent(SearchInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open overlay', () => {
    component.isOverlayOpen = false

    // trigger the click
    const nativeElement = fixture.nativeElement
    const button = nativeElement.querySelector('.button-tree-view')
    button.dispatchEvent(new Event('click'))

    expect(component.isOverlayOpen).toBe(true)
  })

  it('should close overlay', () => {
    // open overlay panel
    component.isOverlayOpen = true
    fixture.detectChanges()

    // trigger the click
    const button = document.querySelector('.cdk-overlay-container num-search-text-overlay-content')
    button.dispatchEvent(new Event('closeOverlay'))

    expect(component.isOverlayOpen).toBe(false)
  })

  it('should fire storeQuery event', () => {
    spyOn(component.storeQuery, 'emit')
    component.doStoreQuery(new Query())
    expect(component.storeQuery.emit).toBeCalled()
  })

  it('should open overlay for designated searchMode = "tree"', () => {
    component.searchMode = 'text'
    component.search = ''
    component.isOverlayOpen = false

    component.switchSearchMode({} as MouseEvent)

    expect(component.searchMode).toBe('tree')
    expect(component.isOverlayOpen).toBe(true)
  })

  it('should open overlay for designated searchMode = "text" with search text', () => {
    component.searchMode = 'tree'
    component.search = 'abc'

    component.switchSearchMode({} as MouseEvent)

    expect(component.searchMode).toBe('text')
    expect(component.isOverlayOpen).toBe(true)
  })

  it('should close overlay for designated searchMode = "text" without search text', () => {
    component.searchMode = 'tree'
    component.search = ''

    component.switchSearchMode({} as MouseEvent)

    expect(component.searchMode).toBe('text')
    expect(component.isOverlayOpen).toBe(false)
  })

  it('should delete search text', () => {
    component.search = 'abc'
    component.isOverlayOpen = true

    component.closeOverlay('text')

    expect(component.search).toBe('')
    expect(component.isOverlayOpen).toBe(false)
  })

  it('should not delete search text', () => {
    component.search = 'abc'
    component.isOverlayOpen = true

    component.closeOverlay('tree')

    expect(component.search).toBe('abc')
    expect(component.isOverlayOpen).toBe(false)
  })
})
