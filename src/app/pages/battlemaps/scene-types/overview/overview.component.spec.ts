import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapSceneTypeOverviewComponent } from './overview.component';

describe('BattlemapSceneTypeOverviewComponent', () => {
  let component: BattlemapSceneTypeOverviewComponent;
  let fixture: ComponentFixture<BattlemapSceneTypeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapSceneTypeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapSceneTypeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
