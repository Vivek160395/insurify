import { TestBed } from '@angular/core/testing';

import { EditInsuranceService } from './edit-insurance.service';

describe('EditInsuranceService', () => {
  let service: EditInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
