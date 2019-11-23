import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabCombatComponent } from './combat.component';

describe('PathfinderTabCombatComponent', () => {
  let component: PathfinderTabCombatComponent;
  let fixture: ComponentFixture<PathfinderTabCombatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabCombatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
