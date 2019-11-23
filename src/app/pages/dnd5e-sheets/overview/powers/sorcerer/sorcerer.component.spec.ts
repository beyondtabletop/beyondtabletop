import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerSorcererComponent } from './sorcerer.component';

describe('Dnd5eOverviewPowerSorcererComponent', () => {
  let component: Dnd5eOverviewPowerSorcererComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerSorcererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerSorcererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerSorcererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
