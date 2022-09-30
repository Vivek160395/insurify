import { TestBed } from '@angular/core/testing';

import { CreateInsuranceService } from './create-insurance.service';

describe('CreateInsuranceService', () => {
  let service: CreateInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
