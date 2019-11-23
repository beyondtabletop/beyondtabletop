import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabSpellPickerComponent } from './spell-picker.component';

describe('Dnd5eTabSpellPickerComponent', () => {
  let component: Dnd5eTabSpellPickerComponent;
  let fixture: ComponentFixture<Dnd5eTabSpellPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabSpellPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabSpellPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
