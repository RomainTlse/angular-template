import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { provideHttpClient } from '@angular/common/http';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
