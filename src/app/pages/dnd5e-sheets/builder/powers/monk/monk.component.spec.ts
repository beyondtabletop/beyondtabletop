import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerMonkComponent } from './monk.component';

describe('Dnd5eBuilderPowerMonkComponent', () => {
  let component: Dnd5eBuilderPowerMonkComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerMonkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerMonkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerMonkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
