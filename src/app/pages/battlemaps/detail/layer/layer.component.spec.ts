import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailLayerComponent } from './layer.component';

describe('BattlemapDetailLayerComponent', () => {
  let component: BattlemapDetailLayerComponent;
  let fixture: ComponentFixture<BattlemapDetailLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
