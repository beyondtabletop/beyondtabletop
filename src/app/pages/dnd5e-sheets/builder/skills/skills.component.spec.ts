import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderSkillsComponent } from './skills.component';

describe('Dnd5eBuilderSkillsComponent', () => {
  let component: Dnd5eBuilderSkillsComponent;
  let fixture: ComponentFixture<Dnd5eBuilderSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
