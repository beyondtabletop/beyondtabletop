import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgEntityCalculationComponent } from './calculation.component';

describe('RpgEntityCalculationComponent', () => {
  let component: RpgEntityCalculationComponent;
  let fixture: ComponentFixture<RpgEntityCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgEntityCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgEntityCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
