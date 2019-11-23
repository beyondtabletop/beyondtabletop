import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapSceneTypeHexagonComponent } from './hexagon.component';

describe('BattlemapSceneTypeHexagonComponent', () => {
  let component: BattlemapSceneTypeHexagonComponent;
  let fixture: ComponentFixture<BattlemapSceneTypeHexagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapSceneTypeHexagonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapSceneTypeHexagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
