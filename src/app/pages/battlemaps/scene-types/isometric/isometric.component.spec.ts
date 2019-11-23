import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapSceneTypeIsometricComponent } from './isometric.component';

describe('BattlemapSceneTypeIsometricComponent', () => {
  let component: BattlemapSceneTypeIsometricComponent;
  let fixture: ComponentFixture<BattlemapSceneTypeIsometricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapSceneTypeIsometricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapSceneTypeIsometricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
