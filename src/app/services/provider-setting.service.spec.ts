import { TestBed } from '@angular/core/testing';

import { ProviderSettingService } from './provider-setting.service';

describe('ProviderService', () => {
  let service: ProviderSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
