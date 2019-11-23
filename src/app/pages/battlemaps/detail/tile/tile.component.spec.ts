import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailTileComponent } from './tile.component';

describe('BattlemapDetailTileComponent', () => {
  let component: BattlemapDetailTileComponent;
  let fixture: ComponentFixture<BattlemapDetailTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
