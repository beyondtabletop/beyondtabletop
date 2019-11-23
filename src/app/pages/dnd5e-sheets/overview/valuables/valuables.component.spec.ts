import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewValuablesComponent } from './valuables.component';

describe('Dnd5eOverviewValuablesComponent', () => {
  let component: Dnd5eOverviewValuablesComponent;
  let fixture: ComponentFixture<Dnd5eOverviewValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
