import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchOverlayTreeComponent } from './search-overlay-tree.component'
import { SearchHeaderTreeComponent } from '../search-header-tree/search-header-tree.component'
import { SearchFooterTreeComponent } from '../search-footer-tree/search-footer-tree.component'
import { SearchInputTermEntryComponent } from '../search-input-term-entry/search-input-term-entry.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../layout/material/material.module'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CategoryEntry } from '../../model/api/terminology/terminology'
import { BackendService } from '../../service/backend.service'
import { Observable, of } from 'rxjs'

describe('SearchOverlayTreeComponent', () => {
  let component: SearchOverlayTreeComponent
  let fixture: ComponentFixture<SearchOverlayTreeComponent>

  const backendService = {
    getCategories(): Observable<Array<CategoryEntry>> {
      return of([new CategoryEntry()])
    },
  } as BackendService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchOverlayTreeComponent,
        SearchHeaderTreeComponent,
        SearchFooterTreeComponent,
        SearchInputTermEntryComponent,
        ButtonComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        OverlayModule,
        FormsModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: BackendService,
          useValue: backendService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => {
          return ''
        },
      }),
    })

    fixture = TestBed.createComponent(SearchOverlayTreeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  /*
    it('should return mocked categories (root entries)', (done: DoneCallback) => {
      const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
      jest
        .spyOn(appConfigService, 'getConfig')
        .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
      const featureService = TestBed.inject<FeatureService>(FeatureService)
      jest.spyOn(featureService, 'mockTerminology').mockReturnValue(false)

      const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
      const mockResponse = new Array<CategoryEntry>()

      service.getCategories().subscribe((categories: Array<CategoryEntry>) => {
        expect(categories).toEqual(new Array<TerminologyEntry>())
        done()
      })

      httpMock.expectOne('http:/abc/terminology/root-entries').flush(mockResponse)
    })
  */

  it('should create', () => {
    jest.spyOn(backendService, 'getCategories').mockReturnValue(of([new CategoryEntry()]))

    /*
        const featureService = TestBed.inject<FeatureService>(FeatureService)
        jest.spyOn(featureService, 'mockTerminology').mockReturnValue(false)

        const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
        const mockResponse = new Array<CategoryEntry>()
    */

    expect(component).toBeTruthy()
  })
})
