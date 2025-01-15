import { TestBed } from '@angular/core/testing';

import { ApprovedloancustomerServiceService } from './approvedloancustomer-service.service';

describe('ApprovedloancustomerServiceService', () => {
  let service: ApprovedloancustomerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedloancustomerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
