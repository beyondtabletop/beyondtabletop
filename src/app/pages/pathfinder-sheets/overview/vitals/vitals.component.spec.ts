import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewVitalsComponent } from './vitals.component';

describe('PathfinderOverviewVitalsComponent', () => {
  let component: PathfinderOverviewVitalsComponent;
  let fixture: ComponentFixture<PathfinderOverviewVitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewVitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
