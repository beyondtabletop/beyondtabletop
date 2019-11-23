import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewValuablesComponent } from './valuables.component';

describe('PathfinderOverviewValuablesComponent', () => {
  let component: PathfinderOverviewValuablesComponent;
  let fixture: ComponentFixture<PathfinderOverviewValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
