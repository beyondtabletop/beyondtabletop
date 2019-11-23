import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapModalsComponent } from './modals.component';

describe('BattlemapModalsComponent', () => {
  let component: BattlemapModalsComponent;
  let fixture: ComponentFixture<BattlemapModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
