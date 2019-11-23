import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgStatInputBooleanComponent } from './boolean.component';

describe('RpgStatInputBooleanComponent', () => {
  let component: RpgStatInputBooleanComponent;
  let fixture: ComponentFixture<RpgStatInputBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgStatInputBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgStatInputBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
