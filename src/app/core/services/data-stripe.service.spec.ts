import { TestBed } from '@angular/core/testing';

import { DataStripeService } from './data-stripe.service';

describe('DataStripeService', () => {
  let service: DataStripeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStripeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
