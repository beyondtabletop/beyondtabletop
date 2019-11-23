import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabDiceComponent } from './dice.component';

describe('PathfinderTabDiceComponent', () => {
  let component: PathfinderTabDiceComponent;
  let fixture: ComponentFixture<PathfinderTabDiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabDiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
