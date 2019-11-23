import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerBarbarianComponent } from './barbarian.component';

describe('Dnd5ePowerBarbarianComponent', () => {
  let component: Dnd5ePowerBarbarianComponent;
  let fixture: ComponentFixture<Dnd5ePowerBarbarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerBarbarianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerBarbarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
