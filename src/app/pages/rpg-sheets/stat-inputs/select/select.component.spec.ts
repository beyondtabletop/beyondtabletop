import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgStatInputSelectComponent } from './select.component';

describe('RpgStatInputSelectComponent', () => {
  let component: RpgStatInputSelectComponent;
  let fixture: ComponentFixture<RpgStatInputSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgStatInputSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgStatInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
