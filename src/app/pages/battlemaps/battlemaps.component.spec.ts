import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapsComponent } from './battlemaps.component';

describe('BattlemapsComponent', () => {
  let component: BattlemapsComponent;
  let fixture: ComponentFixture<BattlemapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
