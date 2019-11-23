import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapActiveCardDnd5eComponent } from './dnd5e.component';

describe('BattlemapActiveCardDnd5eComponent', () => {
  let component: BattlemapActiveCardDnd5eComponent;
  let fixture: ComponentFixture<BattlemapActiveCardDnd5eComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapActiveCardDnd5eComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapActiveCardDnd5eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
