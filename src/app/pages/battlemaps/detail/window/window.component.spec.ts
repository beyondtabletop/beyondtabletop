import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailWindowComponent } from './window.component';

describe('BattlemapDetailWindowComponent', () => {
  let component: BattlemapDetailWindowComponent;
  let fixture: ComponentFixture<BattlemapDetailWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
