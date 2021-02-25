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

  it('should call storage service', () => {
    spyOn(service.storage, 'set')

    const query = QueryProviderService.createTestQuery()

    service.store(query)

    expect(service.storage.set).toHaveBeenCalledTimes(1)
    expect(service.storage.set).toHaveBeenCalledWith('QUERY', query)
  })

  it('default query should be the same as test query ', () => {
    expect(QueryProviderService.createDefaultQuery()).toStrictEqual(
      QueryProviderService.createTestQuery()
    )
  })
})
