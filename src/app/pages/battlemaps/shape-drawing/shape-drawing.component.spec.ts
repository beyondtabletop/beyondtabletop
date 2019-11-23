import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapShapeDrawingComponent } from './shape-drawing.component';

describe('BattlemapShapeDrawingComponent', () => {
  let component: BattlemapShapeDrawingComponent;
  let fixture: ComponentFixture<BattlemapShapeDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapShapeDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapShapeDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
