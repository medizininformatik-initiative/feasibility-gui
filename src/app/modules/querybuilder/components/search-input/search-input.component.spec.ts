import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchInputComponent } from './search-input.component'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { SearchOverlayTreeComponent } from '../search-overlay-tree/search-overlay-tree.component'
import { SearchHeaderTreeComponent } from '../search-header-tree/search-header-tree.component'
import { SearchFooterTreeComponent } from '../search-footer-tree/search-footer-tree.component'
import { SearchInputTermEntryComponent } from '../search-input-term-entry/search-input-term-entry.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Observable, of } from 'rxjs'
import { CategoryEntry } from '../../model/api/terminology/terminology'
import { BackendService } from '../../service/backend.service'

describe('SearchInputComponent', () => {
  let component: SearchInputComponent
  let fixture: ComponentFixture<SearchInputComponent>

  beforeEach(async () => {
    const backendService = {
      getCategories(): Observable<Array<CategoryEntry>> {
        return of([new CategoryEntry()])
      },
    } as BackendService

    await TestBed.configureTestingModule({
      declarations: [
        SearchInputComponent,
        SearchOverlayTreeComponent,
        SearchHeaderTreeComponent,
        SearchFooterTreeComponent,
        SearchInputTermEntryComponent,
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
    component.isTreeViewOpen = false

    // trigger the click
    const nativeElement = fixture.nativeElement
    const button = nativeElement.querySelector('.button-tree-view')
    button.dispatchEvent(new Event('click'))

    expect(component.isTreeViewOpen).toBe(true)
  })

  it('should close overlay', () => {
    // open overlay panel
    component.isTreeViewOpen = true
    fixture.detectChanges()

    // trigger the click
    const button = document.querySelector('.cdk-overlay-container num-search-overlay-tree')
    button.dispatchEvent(new Event('closeOverlay'))

    expect(component.isTreeViewOpen).toBe(false)
  })
})
