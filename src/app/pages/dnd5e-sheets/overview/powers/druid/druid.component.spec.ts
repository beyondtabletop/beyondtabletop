import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerDruidComponent } from './druid.component';

describe('Dnd5eOverviewPowerDruidComponent', () => {
  let component: Dnd5eOverviewPowerDruidComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerDruidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerDruidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerDruidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
