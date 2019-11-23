import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailImageComponent } from './image.component';

describe('BattlemapDetailImageComponent', () => {
  let component: BattlemapDetailImageComponent;
  let fixture: ComponentFixture<BattlemapDetailImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
