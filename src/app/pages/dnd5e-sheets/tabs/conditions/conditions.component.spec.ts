import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabConditionsComponent } from './conditions.component';

describe('Dnd5eTabConditionsComponent', () => {
  let component: Dnd5eTabConditionsComponent;
  let fixture: ComponentFixture<Dnd5eTabConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
