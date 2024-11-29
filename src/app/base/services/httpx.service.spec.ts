import { TestBed } from '@angular/core/testing';

import { HttpxService } from './httpx.service';

describe('HttpxService', () => {
  let service: HttpxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
