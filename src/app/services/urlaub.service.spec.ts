import { TestBed } from '@angular/core/testing';

import { UrlaubService } from './urlaub.service';

describe('UrlaubService', () => {
  let service: UrlaubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlaubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
