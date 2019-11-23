import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapShapeResizerComponent } from './shape-resizer.component';

describe('BattlemapShapeResizerComponent', () => {
  let component: BattlemapShapeResizerComponent;
  let fixture: ComponentFixture<BattlemapShapeResizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapShapeResizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapShapeResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
