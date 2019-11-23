import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgCollectableInputFormulaComponent } from './formula.component';

describe('RpgCollectableInputFormulaComponent', () => {
  let component: RpgCollectableInputFormulaComponent;
  let fixture: ComponentFixture<RpgCollectableInputFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgCollectableInputFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgCollectableInputFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
