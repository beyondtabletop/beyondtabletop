import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewCollectableTypeFormulaComponent } from './formula.component';

describe('RpgOverviewCollectableTypeFormulaComponent', () => {
  let component: RpgOverviewCollectableTypeFormulaComponent;
  let fixture: ComponentFixture<RpgOverviewCollectableTypeFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewCollectableTypeFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewCollectableTypeFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
