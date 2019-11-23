import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabCombatComponent } from './combat.component';

describe('Dnd5eTabCombatComponent', () => {
  let component: Dnd5eTabCombatComponent;
  let fixture: ComponentFixture<Dnd5eTabCombatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabCombatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
