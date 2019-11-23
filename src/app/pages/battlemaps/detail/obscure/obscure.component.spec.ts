import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlemapDetailObscureComponent } from './obscure.component';

describe('BattlemapDetailObscureComponent', () => {
  let component: BattlemapDetailObscureComponent;
  let fixture: ComponentFixture<BattlemapDetailObscureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlemapDetailObscureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlemapDetailObscureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
