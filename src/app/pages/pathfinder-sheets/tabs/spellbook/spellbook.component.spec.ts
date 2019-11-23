import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabSpellbookComponent } from './spellbook.component';

describe('PathfinderTabSpellbookComponent', () => {
  let component: PathfinderTabSpellbookComponent;
  let fixture: ComponentFixture<PathfinderTabSpellbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabSpellbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabSpellbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
