import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSettingListComponent } from './provider-setting-list.component';

describe('ProviderListComponent', () => {
  let component: ProviderSettingListComponent;
  let fixture: ComponentFixture<ProviderSettingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderSettingListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
