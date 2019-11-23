import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewPowersComponent } from './powers.component';

describe('PathfinderOverviewPowersComponent', () => {
  let component: PathfinderOverviewPowersComponent;
  let fixture: ComponentFixture<PathfinderOverviewPowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewPowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
