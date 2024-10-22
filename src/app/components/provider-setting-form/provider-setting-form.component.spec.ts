import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSettingFormComponent } from './provider-setting-form.component';

describe('ProviderSettingFormComponent', () => {
  let component: ProviderSettingFormComponent;
  let fixture: ComponentFixture<ProviderSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderSettingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
