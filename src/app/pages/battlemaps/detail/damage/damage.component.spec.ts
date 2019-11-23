import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailDamageComponent } from './damage.component';

describe('BattlemapDetailDamageComponent', () => {
  let component: BattlemapDetailDamageComponent;
  let fixture: ComponentFixture<BattlemapDetailDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
