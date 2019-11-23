import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgStatInputTextComponent } from './text.component';

describe('RpgStatInputTextComponent', () => {
  let component: RpgStatInputTextComponent;
  let fixture: ComponentFixture<RpgStatInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgStatInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgStatInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
