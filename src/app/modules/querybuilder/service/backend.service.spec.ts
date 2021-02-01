import { TestBed } from '@angular/core/testing'

import { BackendService } from './backend.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AppConfigService } from '../../../config/app-config.service'
import { IAppConfig } from '../../../config/app-config.model'
import { FeatureService } from '../../../service/feature.service'
import { QueryResult } from '../model/api/result/QueryResult'
import DoneCallback = jest.DoneCallback
import { TerminologyEntry } from '../model/api/terminology/terminology'
import { Query } from '../model/api/query/query'

describe('BackendService', () => {
  let service: BackendService

  const EXAMPLE_ID = '12345'
  const EXAMPLE_URL = 'http:/abc/result?id=123456'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(BackendService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return programmatically mocked terminology', (done: DoneCallback) => {
    const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(true)

    service.getTerminolgyEntry(EXAMPLE_ID).subscribe((entry: TerminologyEntry) => {
      expect(entry).toEqual(new TerminologyEntry())
      done()
    })
  })

  it('should return mocked terminology', (done: DoneCallback) => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
    const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockTerminology').mockReturnValue(false)

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse = new TerminologyEntry()

    service.getTerminolgyEntry(EXAMPLE_ID).subscribe((entry: TerminologyEntry) => {
      expect(entry).toEqual(new TerminologyEntry())
      done()
    })

    httpMock.expectOne('http:/abc/terminology?id=12345').flush(mockResponse)
  })

  it('should post programmatically mocked query', (done: DoneCallback) => {
    const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockQuery').mockReturnValue(true)

    service.postQuery(new Query()).subscribe((result: string) => {
      expect(result).toBe(BackendService.MOCK_RESULT_URL)
      done()
    })
  })

  it('should post mocked query', (done: DoneCallback) => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:/abc'))
    const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockQuery').mockReturnValue(false)

    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse = 'http://localhost:9999/mocked-result-of-query/99999'

    service.postQuery(new Query()).subscribe((result: string) => {
      expect(result).toBe('http://localhost:9999/mocked-result-of-query/99999')
      done()
    })

    httpMock.expectOne(new Query()).flush(mockResponse)
  })

  it('should return programmatically mocked result', (done: DoneCallback) => {
    const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockResult').mockReturnValue(true)

    service.getResult(EXAMPLE_URL).subscribe((result: QueryResult) => {
      expect(result).toBe(BackendService.MOCK_QUERY_RESULT)
      done()
    })
  })

  it('should return mocked result', (done: DoneCallback) => {
    const featureService = TestBed.inject<FeatureService>(FeatureService)
    jest.spyOn(featureService, 'mockResult').mockReturnValue(false)
    const httpMock: HttpTestingController = TestBed.inject(HttpTestingController)
    const mockResponse: QueryResult = {
      numberOfPatients: 4711,
      id: 'xyz',
      url: 'http:/abc',
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
      'http:abc/pathToResource?id=12345'
    )
  })

  it("should include '/' only once and parameters", () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(BackendServiceSpecUtil.createConfig('http:abc/'))

    expect(service.createUrl('pathToResource', 'id=' + EXAMPLE_ID)).toBe(
      'http:abc/pathToResource?id=12345'
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
