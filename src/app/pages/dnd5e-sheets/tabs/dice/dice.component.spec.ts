import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabDiceComponent } from './dice.component';

describe('Dnd5eTabDiceComponent', () => {
  let component: Dnd5eTabDiceComponent;
  let fixture: ComponentFixture<Dnd5eTabDiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabDiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
