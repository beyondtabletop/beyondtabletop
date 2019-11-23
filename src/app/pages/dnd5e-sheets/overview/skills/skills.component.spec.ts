import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eOverviewSkillsComponent } from './skills.component';

describe('Dnd5eOverviewSkillsComponent', () => {
  let component: Dnd5eOverviewSkillsComponent;
  let fixture: ComponentFixture<Dnd5eOverviewSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eOverviewSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eOverviewSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
