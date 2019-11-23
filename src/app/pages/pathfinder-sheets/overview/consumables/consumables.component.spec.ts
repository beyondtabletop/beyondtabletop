import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewConsumablesComponent } from './consumables.component';

describe('PathfinderOverviewConsumablesComponent', () => {
  let component: PathfinderOverviewConsumablesComponent;
  let fixture: ComponentFixture<PathfinderOverviewConsumablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewConsumablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
