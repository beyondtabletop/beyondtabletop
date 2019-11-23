import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerWizardComponent } from './wizard.component';

describe('Dnd5ePowerWizardComponent', () => {
  let component: Dnd5ePowerWizardComponent;
  let fixture: ComponentFixture<Dnd5ePowerWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
