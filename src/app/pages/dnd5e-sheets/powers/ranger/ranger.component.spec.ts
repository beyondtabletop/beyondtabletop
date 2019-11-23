import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerRangerComponent } from './ranger.component';

describe('Dnd5ePowerRangerComponent', () => {
  let component: Dnd5ePowerRangerComponent;
  let fixture: ComponentFixture<Dnd5ePowerRangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerRangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerRangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
