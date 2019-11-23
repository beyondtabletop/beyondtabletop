import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewCustomStatsComponent } from './custom-stats.component';

describe('Dnd5eOverviewCustomStatsComponent', () => {
  let component: Dnd5eOverviewCustomStatsComponent;
  let fixture: ComponentFixture<Dnd5eOverviewCustomStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewCustomStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewCustomStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
