import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersettingsListComponent } from './providersettings-list.component';

describe('ProvidersettingsListComponent', () => {
  let component: ProvidersettingsListComponent;
  let fixture: ComponentFixture<ProvidersettingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvidersettingsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
