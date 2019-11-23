import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerWizardComponent } from './wizard.component';

describe('Dnd5eOverviewPowerWizardComponent', () => {
  let component: Dnd5eOverviewPowerWizardComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
