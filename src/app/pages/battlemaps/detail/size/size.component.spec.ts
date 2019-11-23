import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailSizeComponent } from './size.component';

describe('BattlemapDetailSizeComponent', () => {
  let component: BattlemapDetailSizeComponent;
  let fixture: ComponentFixture<BattlemapDetailSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
