import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerFighterComponent } from './fighter.component';

describe('Dnd5eOverviewPowerFighterComponent', () => {
  let component: Dnd5eOverviewPowerFighterComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerFighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerFighterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerFighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
