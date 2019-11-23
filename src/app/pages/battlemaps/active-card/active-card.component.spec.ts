import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapActiveCardComponent } from './active-card.component';

describe('BattlemapActiveCardComponent', () => {
  let component: BattlemapActiveCardComponent;
  let fixture: ComponentFixture<BattlemapActiveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapActiveCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapActiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
