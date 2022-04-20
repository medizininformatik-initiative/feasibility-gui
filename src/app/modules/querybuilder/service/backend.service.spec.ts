import { TestBed } from '@angular/core/testing'

import { BackendService } from './backend.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AppConfigService } from '../../../config/app-config.service'
import { IAppConfig } from '../../../config/app-config.model'
import { FeatureService } from '../../../service/feature.service'
import { QueryResult } from '../model/api/result/QueryResult'
import { CategoryEntry, TerminologyEntry } from '../model/api/terminology/terminology'
import { QueryResponse } from '../model/api/result/QueryResponse'
import { Query } from '../model/api/query/query'
import DoneCallback = jest.DoneCallback
import { MockBackendDataProvider } from './MockBackendDataProvider'

describe('BackendService', () => {
  let service: BackendService

  const EXAMPLE_ID = '1'
  const EXAMPLE_SEARCH = 'DIAB'
  const EXAMPLE_URL = 'http:/abc/querybuillder/result?id=123456'

  const featureService = {
    getPatientResultLowerBoundary(): number {
      return 10
    },
    getLocationResultLowerBoundary(): number {
      return 3
    },
    mockTerminology(): boolean {
      return true
    },
    mockQuery(): boolean {
      return true
    },
    mockResult(): boolean {
      return true
    },
    getQueryVersion(): string {
      return 'v2'
    },
  } as FeatureService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: FeatureService,
          useValue: featureService,
        },
      ],
    }).compileComponents()
    service = TestBed.inject(BackendService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return programmatically mocked categories (root entries)', (done: DoneCallback) => {
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(true)

    service.getCategories().subscribe((categories: Array<CategoryEntry>) => {
      expect(categories).toEqual(new MockBackendDataProvider().getCategoryEntries())
      done()
    })
  })

  it('should return mocked categories (root entries)', (done: DoneCallback) => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(false)

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse = new Array<CategoryEntry>()

    service.getCategories().subscribe((categories: Array<CategoryEntry>) => {
      expect(categories).toEqual(new Array<TerminologyEntry>())
      done()
    })

    httpMock.expectOne('http:/abc/terminology/root-entries').flush(mockResponse)
  })

  it('should return programmatically mocked terminology tree', (done: DoneCallback) => {
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(true)

    service.getTerminolgyTree(EXAMPLE_ID).subscribe((entry: TerminologyEntry) => {
      expect(entry).toEqual(new MockBackendDataProvider().getTerminologyEntry('1'))
      done()
    })
  })

  it('should return mocked terminology tree', (done: DoneCallback) => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(false)

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse = new TerminologyEntry()

    service.getTerminolgyTree(EXAMPLE_ID).subscribe((entry: TerminologyEntry) => {
      expect(entry).toEqual(new TerminologyEntry())
      done()
    })

    httpMock.expectOne('http:/abc/terminology/entries/1').flush(mockResponse)
  })

  it('should return programmatically mocked search result list', (done: DoneCallback) => {
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(true)

    service
      .getTerminolgyEntrySearchResult('1', EXAMPLE_SEARCH)
      .subscribe((entries: Array<TerminologyEntry>) => {
        expect(entries).toStrictEqual(new Array<TerminologyEntry>())
        done()
      })
  })

  it('should return mocked search result list', (done: DoneCallback) => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(false)

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse = new Array<TerminologyEntry>()

    service
      .getTerminolgyEntrySearchResult('1', EXAMPLE_SEARCH)
      .subscribe((entries: Array<TerminologyEntry>) => {
        expect(entries).toStrictEqual(new Array<TerminologyEntry>())
        done()
      })

    httpMock
      .expectOne(
        'http:/abc/terminology/selectable-entries?query=' + EXAMPLE_SEARCH + '&categoryId=1'
      )
      .flush(mockResponse)
  })

  it('should return mocked search result list (without categoryId)', (done: DoneCallback) => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(false)

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse = new Array<TerminologyEntry>()

    service
      .getTerminolgyEntrySearchResult('', EXAMPLE_SEARCH)
      .subscribe((entries: Array<TerminologyEntry>) => {
        expect(entries).toStrictEqual(new Array<TerminologyEntry>())
        done()
      })

    httpMock
      .expectOne('http:/abc/terminology/selectable-entries?query=' + EXAMPLE_SEARCH)
      .flush(mockResponse)
  })

  it('should post programmatically mocked query', (done: DoneCallback) => {
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockQuery').mockReturnValue(true)

    service.postQuery(new Query()).subscribe((queryResponse: QueryResponse) => {
      expect(queryResponse).toStrictEqual({ location: BackendService.MOCK_RESULT_URL })
      done()
    })
  })

  // TODO Response from Location Header
  /*
  it('should post mocked query', (done: DoneCallback) => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockQuery').mockReturnValue(false)

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse = 'http://localhost:9999/mocked-result-of-query/99999'
    // const mockResponse = '{"body": "http://localhost:9999/mocked-result-of-query/99999", "headers": {"headers": Map {}, "lazyUpdate": null, "normalizedNames": Map {}}, "ok": true, "status": 200, "statusText": "OK", "type": 4, "url": "http:/abc/query-handler/run-query"}'

    service.postQuery(new Query()).subscribe((queryResponse: QueryResponse) => {
      expect(queryResponse).toBe('http://localhost:9999/mocked-result-of-query/99999')
      done()
    })

    httpMock.expectOne('http:/abc/query-handler/run-query').flush(mockResponse)
  })
*/

  it('should return programmatically mocked result', (done: DoneCallback) => {
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockResult').mockReturnValue(true)

    service.getResult(EXAMPLE_URL).subscribe((result: QueryResult) => {
      expect(result.queryId).toBe('12345')
      done()
    })
  })

  it('should return mocked result', (done: DoneCallback) => {
    // const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockResult').mockReturnValue(false)
    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse: QueryResult = {
      totalNumberOfPatients: 4711,
      queryId: 'xyz',
      resultLines: [],
    }

    service.getResult(EXAMPLE_URL).subscribe((result: QueryResult) => {
      expect(result).toBe(mockResponse)
      done()
    })

    httpMock.expectOne(EXAMPLE_URL).flush(mockResponse)
  })

  it("should include '/' and no parameters", () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:abc'))

    expect(service.createUrl('pathToResource')).toBe('http:abc/pathToResource')
  })

  it("should include '/' only once and no parameters", () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:abc/'))

    expect(service.createUrl('pathToResource')).toBe('http:abc/pathToResource')
  })

  it("should include '/' and parameters", () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:abc'))

    expect(service.createUrl('pathToResource', 'id=' + EXAMPLE_ID)).toBe(
      'http:abc/pathToResource?id=1'
    )
  })

  it("should include '/' only once and parameters", () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:abc/'))

    expect(service.createUrl('pathToResource', 'id=' + EXAMPLE_ID)).toBe(
      'http:abc/pathToResource?id=1'
    )
  })
})

class BackendServiceSpecUtil {
  static createConfig(backendUrl: string): IAppConfig {
    return {
      uiBackendApi: {
        baseUrl: backendUrl,
      },
    } as IAppConfig
  }
}
