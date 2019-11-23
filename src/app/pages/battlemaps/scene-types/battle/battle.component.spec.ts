import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapSceneTypeBattleComponent } from './battle.component';

describe('BattlemapSceneTypeBattleComponent', () => {
  let component: BattlemapSceneTypeBattleComponent;
  let fixture: ComponentFixture<BattlemapSceneTypeBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapSceneTypeBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapSceneTypeBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
