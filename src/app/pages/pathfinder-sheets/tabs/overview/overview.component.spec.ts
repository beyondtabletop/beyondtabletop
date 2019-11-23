import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabOverviewComponent } from './overview.component';

describe('PathfinderTabOverviewComponent', () => {
  let component: PathfinderTabOverviewComponent;
  let fixture: ComponentFixture<PathfinderTabOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
