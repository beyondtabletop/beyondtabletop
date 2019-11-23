import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailPinnedComponent } from './pinned.component';

describe('BattlemapDetailPinnedComponent', () => {
  let component: BattlemapDetailPinnedComponent;
  let fixture: ComponentFixture<BattlemapDetailPinnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailPinnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailPinnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
