import { TestBed } from '@angular/core/testing';

import { CopyProviderSettingService } from './copy-provider-setting.service';

describe('CopyProviderSettingService', () => {
  let service: CopyProviderSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyProviderSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
