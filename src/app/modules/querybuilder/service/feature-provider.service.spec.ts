import { TestBed } from '@angular/core/testing'

import { FeatureProviderService } from './feature-provider.service'

describe('FeatureProviderService', () => {
  let service: FeatureProviderService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(FeatureProviderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
