import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderOverviewSkillsComponent } from './skills.component';

describe('PathfinderOverviewSkillsComponent', () => {
  let component: PathfinderOverviewSkillsComponent;
  let fixture: ComponentFixture<PathfinderOverviewSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderOverviewSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderOverviewSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
