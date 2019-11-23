import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailDrawableComponent } from './drawable.component';

describe('BattlemapDetailDrawableComponent', () => {
  let component: BattlemapDetailDrawableComponent;
  let fixture: ComponentFixture<BattlemapDetailDrawableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailDrawableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailDrawableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
