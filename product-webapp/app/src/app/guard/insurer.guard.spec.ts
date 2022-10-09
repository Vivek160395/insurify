import { TestBed } from '@angular/core/testing';

import { InsurerGuard } from './insurer.guard';

describe('InsurerGuard', () => {
  let guard: InsurerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InsurerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
