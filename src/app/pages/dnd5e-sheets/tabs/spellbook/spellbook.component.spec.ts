import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabSpellbookComponent } from './spellbook.component';

describe('Dnd5eTabSpellbookComponent', () => {
  let component: Dnd5eTabSpellbookComponent;
  let fixture: ComponentFixture<Dnd5eTabSpellbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabSpellbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabSpellbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
