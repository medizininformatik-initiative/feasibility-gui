import { TestBed } from '@angular/core/testing';

import { ReferenceCriteriaService } from './reference-criteria.service';

describe('ReferenceCriteriaService', () => {
  let service: ReferenceCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
