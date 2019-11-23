import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewEntityCalculationComponent } from './calculation.component';

describe('RpgOverviewEntityCalculationComponent', () => {
  let component: RpgOverviewEntityCalculationComponent;
  let fixture: ComponentFixture<RpgOverviewEntityCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewEntityCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewEntityCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
