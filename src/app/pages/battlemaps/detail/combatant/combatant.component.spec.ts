import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailCombatantComponent } from './combatant.component';

describe('BattlemapDetailCombatantComponent', () => {
  let component: BattlemapDetailCombatantComponent;
  let fixture: ComponentFixture<BattlemapDetailCombatantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailCombatantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailCombatantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
