import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapCombatantComponent } from './combatant.component';

describe('BattlemapCombatantComponent', () => {
  let component: BattlemapCombatantComponent;
  let fixture: ComponentFixture<BattlemapCombatantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapCombatantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapCombatantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
