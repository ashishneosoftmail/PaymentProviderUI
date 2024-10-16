import { TestBed } from '@angular/core/testing';

import { ProvidersettingService } from './providersetting.service';

describe('ProvidersettingService', () => {
  let service: ProvidersettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
