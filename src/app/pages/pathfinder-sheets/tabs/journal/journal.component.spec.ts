import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabJournalComponent } from './journal.component';

describe('PathfinderTabJournalComponent', () => {
  let component: PathfinderTabJournalComponent;
  let fixture: ComponentFixture<PathfinderTabJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
