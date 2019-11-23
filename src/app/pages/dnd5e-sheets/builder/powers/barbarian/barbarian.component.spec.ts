import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerBarbarianComponent } from './barbarian.component';

describe('Dnd5eBuilderPowerBarbarianComponent', () => {
  let component: Dnd5eBuilderPowerBarbarianComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerBarbarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerBarbarianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerBarbarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
