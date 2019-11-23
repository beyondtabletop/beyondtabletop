import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewWeightComponent } from './weight.component';

describe('PathfinderOverviewWeightComponent', () => {
  let component: PathfinderOverviewWeightComponent;
  let fixture: ComponentFixture<PathfinderOverviewWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
