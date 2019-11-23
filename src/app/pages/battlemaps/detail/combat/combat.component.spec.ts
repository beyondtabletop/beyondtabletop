import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailCombatComponent } from './combat.component';

describe('BattlemapDetailCombatComponent', () => {
  let component: BattlemapDetailCombatComponent;
  let fixture: ComponentFixture<BattlemapDetailCombatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailCombatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
