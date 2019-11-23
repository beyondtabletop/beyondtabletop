import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewAbilitiesComponent } from './abilities.component';

describe('PathfinderOverviewAbilitiesComponent', () => {
  let component: PathfinderOverviewAbilitiesComponent;
  let fixture: ComponentFixture<PathfinderOverviewAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
