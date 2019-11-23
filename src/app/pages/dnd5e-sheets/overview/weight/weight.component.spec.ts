import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewWeightComponent } from './weight.component';

describe('Dnd5eOverviewWeightComponent', () => {
  let component: Dnd5eOverviewWeightComponent;
  let fixture: ComponentFixture<Dnd5eOverviewWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
