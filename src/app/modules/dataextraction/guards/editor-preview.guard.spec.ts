import { TestBed } from '@angular/core/testing';

import { PreviewPermissionSerive } from './editor-preview.guard';

describe('PreviewPermissionSerive', () => {
  let guard: PreviewPermissionSerive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreviewPermissionSerive);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
