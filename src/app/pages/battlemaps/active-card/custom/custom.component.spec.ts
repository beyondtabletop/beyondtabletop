import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapActiveCardCustomComponent } from './custom.component';

describe('BattlemapActiveCardCustomComponent', () => {
  let component: BattlemapActiveCardCustomComponent;
  let fixture: ComponentFixture<BattlemapActiveCardCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapActiveCardCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapActiveCardCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
