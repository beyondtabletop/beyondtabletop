import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewCompanionsComponent } from './companions.component';

describe('PathfinderOverviewCompanionsComponent', () => {
  let component: PathfinderOverviewCompanionsComponent;
  let fixture: ComponentFixture<PathfinderOverviewCompanionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewCompanionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewCompanionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
