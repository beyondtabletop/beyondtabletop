import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewAttacksComponent } from './attacks.component';

describe('PathfinderOverviewAttacksComponent', () => {
  let component: PathfinderOverviewAttacksComponent;
  let fixture: ComponentFixture<PathfinderOverviewAttacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewAttacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
