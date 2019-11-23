import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailRoundComponent } from './round.component';

describe('BattlemapDetailRoundComponent', () => {
  let component: BattlemapDetailRoundComponent;
  let fixture: ComponentFixture<BattlemapDetailRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
