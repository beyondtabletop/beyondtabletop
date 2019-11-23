import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerRogueComponent } from './rogue.component';

describe('Dnd5eBuilderPowerRogueComponent', () => {
  let component: Dnd5eBuilderPowerRogueComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerRogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerRogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerRogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
