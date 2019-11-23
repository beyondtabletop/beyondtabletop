import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewAbilitiesComponent } from './abilities.component';

describe('Dnd5eOverviewAbilitiesComponent', () => {
  let component: Dnd5eOverviewAbilitiesComponent;
  let fixture: ComponentFixture<Dnd5eOverviewAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
