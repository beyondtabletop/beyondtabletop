import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerWarlockComponent } from './warlock.component';

describe('Dnd5eOverviewPowerWarlockComponent', () => {
  let component: Dnd5eOverviewPowerWarlockComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerWarlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerWarlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerWarlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
