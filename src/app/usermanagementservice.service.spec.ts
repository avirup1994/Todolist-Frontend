import { TestBed } from '@angular/core/testing';

import { UsermanagementserviceService } from './usermanagementservice.service';

describe('UsermanagementserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsermanagementserviceService = TestBed.get(UsermanagementserviceService);
    expect(service).toBeTruthy();
  });
});
