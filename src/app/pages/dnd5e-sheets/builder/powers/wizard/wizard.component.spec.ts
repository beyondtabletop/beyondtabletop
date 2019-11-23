import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerWizardComponent } from './wizard.component';

describe('Dnd5eBuilderPowerWizardComponent', () => {
  let component: Dnd5eBuilderPowerWizardComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
