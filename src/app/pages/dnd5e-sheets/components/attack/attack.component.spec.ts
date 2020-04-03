import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eEditAttackComponent } from './attack.component';

describe('Dnd5eEditAttackComponent', () => {
  let component: Dnd5eEditAttackComponent;
  let fixture: ComponentFixture<Dnd5eEditAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eEditAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eEditAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
