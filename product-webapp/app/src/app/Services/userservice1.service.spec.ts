import { TestBed } from '@angular/core/testing';

import { Userservice1Service } from './userservice1.service';

describe('Userservice1Service', () => {
  let service: Userservice1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userservice1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
