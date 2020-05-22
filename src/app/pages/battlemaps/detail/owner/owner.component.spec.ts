import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailOwnerComponent } from './owner.component';

describe('BattlemapDetailOwnerComponent', () => {
  let component: BattlemapDetailOwnerComponent;
  let fixture: ComponentFixture<BattlemapDetailOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
