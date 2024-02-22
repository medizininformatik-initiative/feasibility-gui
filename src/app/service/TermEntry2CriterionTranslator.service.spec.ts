import { TestBed } from '@angular/core/testing';

import { TermEntry2CriterionTranslatorService } from './TermEntry2CriterionTranslator.service';

describe('TermEntry2CriterionTranslatorService', () => {
  let service: TermEntry2CriterionTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermEntry2CriterionTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
