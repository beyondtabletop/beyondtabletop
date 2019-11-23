import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailFogComponent } from './fog.component';

describe('BattlemapDetailFogComponent', () => {
  let component: BattlemapDetailFogComponent;
  let fixture: ComponentFixture<BattlemapDetailFogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailFogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailFogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
