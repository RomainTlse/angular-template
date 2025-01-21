import { TestBed } from '@angular/core/testing';

import { HttpRequestService } from './http-request.service';
import { HttpClientModule } from '@angular/common/http';

describe('HttpRequestService', () => {
  let service: HttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(HttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
