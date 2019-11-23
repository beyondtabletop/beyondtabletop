import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabSkillsComponent } from './skills.component';

describe('PathfinderTabSkillsComponent', () => {
  let component: PathfinderTabSkillsComponent;
  let fixture: ComponentFixture<PathfinderTabSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
