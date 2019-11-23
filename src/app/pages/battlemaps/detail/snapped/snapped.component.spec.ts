import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailSnappedComponent } from './snapped.component';

describe('BattlemapDetailSnappedComponent', () => {
  let component: BattlemapDetailSnappedComponent;
  let fixture: ComponentFixture<BattlemapDetailSnappedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailSnappedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailSnappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
