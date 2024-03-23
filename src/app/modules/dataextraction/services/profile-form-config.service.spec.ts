import { TestBed } from '@angular/core/testing';

import { ProfileFormConfigService } from './profile-form-config.service';

describe('ProfileFormConfigService', () => {
  let service: ProfileFormConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFormConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
