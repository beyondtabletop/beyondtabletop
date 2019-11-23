import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerBarbarianComponent } from './barbarian.component';

describe('Dnd5eOverviewPowerBarbarianComponent', () => {
  let component: Dnd5eOverviewPowerBarbarianComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerBarbarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerBarbarianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerBarbarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
