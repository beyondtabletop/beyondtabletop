import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerMonkComponent } from './monk.component';

describe('Dnd5eOverviewPowerMonkComponent', () => {
  let component: Dnd5eOverviewPowerMonkComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerMonkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerMonkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerMonkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
