import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersettingComponent } from './providersetting.component';

describe('ProvidersettingComponent', () => {
  let component: ProvidersettingComponent;
  let fixture: ComponentFixture<ProvidersettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvidersettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
