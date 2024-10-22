import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersettingsUpdateComponent } from './providersettings-update.component';

describe('ProvidersettingsUpdateComponent', () => {
  let component: ProvidersettingsUpdateComponent;
  let fixture: ComponentFixture<ProvidersettingsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvidersettingsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersettingsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
