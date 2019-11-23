import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewSpellsComponent } from './spells.component';

describe('Dnd5eOverviewSpellsComponent', () => {
  let component: Dnd5eOverviewSpellsComponent;
  let fixture: ComponentFixture<Dnd5eOverviewSpellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewSpellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
