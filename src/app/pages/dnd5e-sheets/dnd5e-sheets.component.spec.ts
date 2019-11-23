import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eSheetsComponent } from './dnd5e-sheets.component';

describe('Dnd5eSheetsComponent', () => {
  let component: Dnd5eSheetsComponent;
  let fixture: ComponentFixture<Dnd5eSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
