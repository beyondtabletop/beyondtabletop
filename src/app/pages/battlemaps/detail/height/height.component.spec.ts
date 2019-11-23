import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailHeightComponent } from './height.component';

describe('BattlemapDetailHeightComponent', () => {
  let component: BattlemapDetailHeightComponent;
  let fixture: ComponentFixture<BattlemapDetailHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
