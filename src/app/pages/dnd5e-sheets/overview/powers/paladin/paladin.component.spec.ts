import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerPaladinComponent } from './paladin.component';

describe('Dnd5eOverviewPowerPaladinComponent', () => {
  let component: Dnd5eOverviewPowerPaladinComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerPaladinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerPaladinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerPaladinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
