import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewConditionsComponent } from './conditions.component';

describe('PathfinderOverviewConditionsComponent', () => {
  let component: PathfinderOverviewConditionsComponent;
  let fixture: ComponentFixture<PathfinderOverviewConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
