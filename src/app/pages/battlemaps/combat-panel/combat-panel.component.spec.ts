import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapCombatPanelComponent } from './combat-panel.component';

describe('BattlemapCombatPanelComponent', () => {
  let component: BattlemapCombatPanelComponent;
  let fixture: ComponentFixture<BattlemapCombatPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapCombatPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapCombatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
