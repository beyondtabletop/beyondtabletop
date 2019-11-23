import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailLabelComponent } from './label.component';

describe('BattlemapDetailLabelComponent', () => {
  let component: BattlemapDetailLabelComponent;
  let fixture: ComponentFixture<BattlemapDetailLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
