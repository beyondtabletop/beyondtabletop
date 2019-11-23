import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerMonkComponent } from './monk.component';

describe('Dnd5ePowerMonkComponent', () => {
  let component: Dnd5ePowerMonkComponent;
  let fixture: ComponentFixture<Dnd5ePowerMonkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerMonkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerMonkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
