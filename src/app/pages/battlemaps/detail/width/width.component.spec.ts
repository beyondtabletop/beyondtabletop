import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailWidthComponent } from './width.component';

describe('BattlemapDetailWidthComponent', () => {
  let component: BattlemapDetailWidthComponent;
  let fixture: ComponentFixture<BattlemapDetailWidthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailWidthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
