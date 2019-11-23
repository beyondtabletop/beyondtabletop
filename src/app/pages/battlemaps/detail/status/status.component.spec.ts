import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailStatusComponent } from './status.component';

describe('BattlemapDetailStatusComponent', () => {
  let component: BattlemapDetailStatusComponent;
  let fixture: ComponentFixture<BattlemapDetailStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
