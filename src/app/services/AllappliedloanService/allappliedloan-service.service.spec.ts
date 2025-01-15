import { TestBed } from '@angular/core/testing';

import { AllappliedloanServiceService } from './allappliedloan-service.service';

describe('AllappliedloanServiceService', () => {
  let service: AllappliedloanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllappliedloanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
