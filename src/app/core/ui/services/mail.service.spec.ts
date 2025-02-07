import { TestBed } from '@angular/core/testing';

import { MailService } from './mail.service';
import { provideHttpClient } from '@angular/common/http';

describe('MailService', () => {
  let service: MailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(MailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
