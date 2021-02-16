import { TestBed } from '@angular/core/testing'

import { QueryProviderService } from './query-provider.service'

describe('QueryProviderService', () => {
  let service: QueryProviderService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(QueryProviderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
