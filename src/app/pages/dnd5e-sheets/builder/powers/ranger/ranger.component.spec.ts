import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerRangerComponent } from './ranger.component';

describe('Dnd5eBuilderPowerRangerComponent', () => {
  let component: Dnd5eBuilderPowerRangerComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerRangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerRangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerRangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
