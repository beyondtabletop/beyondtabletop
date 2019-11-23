import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerPaladinComponent } from './paladin.component';

describe('Dnd5ePowerPaladinComponent', () => {
  let component: Dnd5ePowerPaladinComponent;
  let fixture: ComponentFixture<Dnd5ePowerPaladinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerPaladinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerPaladinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
