import { TestBed } from '@angular/core/testing';

import { ReccomendationServiceService } from './reccomendation-service.service';

describe('ReccomendationServiceService', () => {
  let service: ReccomendationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReccomendationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
