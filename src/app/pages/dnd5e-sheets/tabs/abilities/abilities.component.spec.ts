import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabAbilitiesComponent } from './abilities.component';

describe('Dnd5eTabAbilitiesComponent', () => {
  let component: Dnd5eTabAbilitiesComponent;
  let fixture: ComponentFixture<Dnd5eTabAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
