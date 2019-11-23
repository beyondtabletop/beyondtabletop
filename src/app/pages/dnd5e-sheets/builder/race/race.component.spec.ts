import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderRaceComponent } from './race.component';

describe('Dnd5eBuilderRaceComponent', () => {
  let component: Dnd5eBuilderRaceComponent;
  let fixture: ComponentFixture<Dnd5eBuilderRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
