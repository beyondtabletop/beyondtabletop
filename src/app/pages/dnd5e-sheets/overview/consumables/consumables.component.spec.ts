import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewConsumablesComponent } from './consumables.component';

describe('Dnd5eOverviewConsumablesComponent', () => {
  let component: Dnd5eOverviewConsumablesComponent;
  let fixture: ComponentFixture<Dnd5eOverviewConsumablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewConsumablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
