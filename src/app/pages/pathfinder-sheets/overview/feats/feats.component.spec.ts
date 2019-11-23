import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewFeatsComponent } from './feats.component';

describe('PathfinderOverviewFeatsComponent', () => {
  let component: PathfinderOverviewFeatsComponent;
  let fixture: ComponentFixture<PathfinderOverviewFeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewFeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewFeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
