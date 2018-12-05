import { TestBed } from '@angular/core/testing';

import { RequestCacheWithMap } from './request-cache.service';

describe('RequestCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestCacheWithMap = TestBed.get(RequestCacheWithMap);
    expect(service).toBeTruthy();
  });
});
