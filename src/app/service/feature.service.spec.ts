import { TestBed } from '@angular/core/testing'

import { FeatureService } from './feature.service'
import { AppConfigService } from '../config/app-config.service'
import { IAppConfig } from '../config/app-config.model'
import { HttpClient, HttpClientModule } from '@angular/common/http'

describe('FeatureService', () => {
  let service: FeatureService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppConfigService, HttpClient],
    })
    service = TestBed.inject(FeatureService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should use features V2', () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(FeatureServiceSpecUtil.createConfig(true))

    expect(service.useFeatureMultipleGroups()).toBeTruthy()
    expect(service.useFeatureDependentGroups()).toBeTruthy()
    expect(service.useFeatureTimeRestriction()).toBeTruthy()
  })

  it('should use mocks in development mode', () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(FeatureServiceSpecUtil.createConfig(true))

    expect(service.isDevelopMode()).toBeTruthy()
    expect(service.mockTerminology()).toBeTruthy()
    expect(service.mockQuery()).toBeTruthy()
    expect(service.mockResult()).toBeTruthy()
  })

  it('should not use features V2', () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(FeatureServiceSpecUtil.createConfig(false))

    expect(service.useFeatureMultipleGroups()).toBeFalsy()
    expect(service.useFeatureDependentGroups()).toBeFalsy()
    expect(service.useFeatureTimeRestriction()).toBeFalsy()
  })

  it('should not use mocks', () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(FeatureServiceSpecUtil.createConfig(false))

    expect(service.isDevelopMode()).toBeTruthy()
    expect(service.mockTerminology()).toBeFalsy()
    expect(service.mockQuery()).toBeFalsy()
    expect(service.mockResult()).toBeFalsy()
  })

  it('should not use mocks in production mode', () => {
    const appConfigService = TestBed.inject<AppConfigService>(AppConfigService)
    jest
      .spyOn(appConfigService, 'getConfig')
      .mockReturnValue(FeatureServiceSpecUtil.createConfig(true))
    jest.spyOn(service, 'isDevelopMode').mockReturnValue(false)

    expect(service.isDevelopMode()).toBeFalsy()
    expect(service.mockTerminology()).toBeFalsy()
    expect(service.mockQuery()).toBeFalsy()
    expect(service.mockResult()).toBeFalsy()
  })
})

class FeatureServiceSpecUtil {
  static createConfig(value: boolean): IAppConfig {
    return {
      features: {
        v2: {
          multiplegroups: value,
          dependentgroups: value,
          timerestriction: value,
        },
      },
      mock: {
        terminology: value,
        query: value,
        result: value,
      },
    } as IAppConfig
  }
}
