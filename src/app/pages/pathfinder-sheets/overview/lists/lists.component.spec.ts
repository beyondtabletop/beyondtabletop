import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewListsComponent } from './lists.component';

describe('PathfinderOverviewListsComponent', () => {
  let component: PathfinderOverviewListsComponent;
  let fixture: ComponentFixture<PathfinderOverviewListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
