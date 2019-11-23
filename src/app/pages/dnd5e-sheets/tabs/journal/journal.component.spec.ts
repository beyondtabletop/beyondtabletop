import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabJournalComponent } from './journal.component';

describe('Dnd5eTabJournalComponent', () => {
  let component: Dnd5eTabJournalComponent;
  let fixture: ComponentFixture<Dnd5eTabJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabJournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
