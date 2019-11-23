import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewCustomStatsComponent } from './custom-stats.component';

describe('PathfinderOverviewCustomStatsComponent', () => {
  let component: PathfinderOverviewCustomStatsComponent;
  let fixture: ComponentFixture<PathfinderOverviewCustomStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewCustomStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewCustomStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
