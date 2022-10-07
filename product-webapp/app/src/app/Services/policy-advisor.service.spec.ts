import { TestBed } from '@angular/core/testing';

import { PolicyAdvisorService } from './policy-advisor.service';

describe('PolicyAdvisorService', () => {
  let service: PolicyAdvisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyAdvisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
