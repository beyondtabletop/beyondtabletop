import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapActiveCardRpgComponent } from '././rpg.component'

describe('BattlemapActiveCardRpgComponent', () => {
  let component: BattlemapActiveCardRpgComponent;
  let fixture: ComponentFixture<BattlemapActiveCardRpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapActiveCardRpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapActiveCardRpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
