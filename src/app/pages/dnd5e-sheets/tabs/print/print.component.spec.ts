import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabPrintComponent } from './print.component';

describe('Dnd5eTabPrintComponent', () => {
  let component: Dnd5eTabPrintComponent;
  let fixture: ComponentFixture<Dnd5eTabPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
