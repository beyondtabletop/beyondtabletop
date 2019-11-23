import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerFighterComponent } from './fighter.component';

describe('Dnd5ePowerFighterComponent', () => {
  let component: Dnd5ePowerFighterComponent;
  let fixture: ComponentFixture<Dnd5ePowerFighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerFighterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerFighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
