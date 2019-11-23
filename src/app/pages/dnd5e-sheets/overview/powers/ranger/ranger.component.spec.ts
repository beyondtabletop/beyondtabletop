import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerRangerComponent } from './ranger.component';

describe('Dnd5eOverviewPowerRangerComponent', () => {
  let component: Dnd5eOverviewPowerRangerComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerRangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerRangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerRangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
