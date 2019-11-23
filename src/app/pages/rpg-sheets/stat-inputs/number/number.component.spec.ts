import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgStatInputNumberComponent } from './number.component';

describe('RpgStatInputNumberComponent', () => {
  let component: RpgStatInputNumberComponent;
  let fixture: ComponentFixture<RpgStatInputNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgStatInputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgStatInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
