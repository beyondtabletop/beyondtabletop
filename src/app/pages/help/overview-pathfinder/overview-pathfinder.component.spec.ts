import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpOverviewPathfinderComponent } from './overview-pathfinder.component';

describe('HelpOverviewPathfinderComponent', () => {
  let component: HelpOverviewPathfinderComponent;
  let fixture: ComponentFixture<HelpOverviewPathfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpOverviewPathfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpOverviewPathfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
