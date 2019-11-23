import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailLayeringComponent } from './layering.component';

describe('BattlemapDetailLayeringComponent', () => {
  let component: BattlemapDetailLayeringComponent;
  let fixture: ComponentFixture<BattlemapDetailLayeringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailLayeringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailLayeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
