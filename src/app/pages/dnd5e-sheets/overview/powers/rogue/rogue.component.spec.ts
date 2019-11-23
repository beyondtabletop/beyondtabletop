import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewPowerRogueComponent } from './rogue.component';

describe('Dnd5eOverviewPowerRogueComponent', () => {
  let component: Dnd5eOverviewPowerRogueComponent;
  let fixture: ComponentFixture<Dnd5eOverviewPowerRogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewPowerRogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewPowerRogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
