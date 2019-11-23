import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapActiveCardPathfinderComponent } from './pathfinder.component';

describe('BattlemapActiveCardPathfinderComponent', () => {
  let component: BattlemapActiveCardPathfinderComponent;
  let fixture: ComponentFixture<BattlemapActiveCardPathfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapActiveCardPathfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapActiveCardPathfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
