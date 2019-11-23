import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerPaladinComponent } from './paladin.component';

describe('Dnd5eBuilderPowerPaladinComponent', () => {
  let component: Dnd5eBuilderPowerPaladinComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerPaladinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerPaladinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerPaladinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
