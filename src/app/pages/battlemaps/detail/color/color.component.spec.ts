import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailColorComponent } from './color.component';

describe('BattlemapDetailColorComponent', () => {
  let component: BattlemapDetailColorComponent;
  let fixture: ComponentFixture<BattlemapDetailColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
