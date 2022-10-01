import { TestBed } from '@angular/core/testing';

import { PersonGuard } from './person.guard';

describe('PersonGuard', () => {
  let guard: PersonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
