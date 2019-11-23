import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgStatInputTextareaComponent } from './textarea.component';

describe('RpgStatInputTextareaComponent', () => {
  let component: RpgStatInputTextareaComponent;
  let fixture: ComponentFixture<RpgStatInputTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgStatInputTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgStatInputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
