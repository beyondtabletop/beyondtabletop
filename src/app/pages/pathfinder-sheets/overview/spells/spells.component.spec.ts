import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewSpellsComponent } from './spells.component';

describe('PathfinderOverviewSpellsComponent', () => {
  let component: PathfinderOverviewSpellsComponent;
  let fixture: ComponentFixture<PathfinderOverviewSpellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewSpellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
