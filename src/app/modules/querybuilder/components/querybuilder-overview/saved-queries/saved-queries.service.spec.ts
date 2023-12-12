import { TestBed } from '@angular/core/testing';

import { SavedQueriesService } from './saved-queries.service';

describe('SavedQueriesService', () => {
  let service: SavedQueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedQueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
