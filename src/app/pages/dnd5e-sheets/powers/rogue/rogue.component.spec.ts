import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerRogueComponent } from './rogue.component';

describe('Dnd5ePowerRogueComponent', () => {
  let component: Dnd5ePowerRogueComponent;
  let fixture: ComponentFixture<Dnd5ePowerRogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerRogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerRogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
