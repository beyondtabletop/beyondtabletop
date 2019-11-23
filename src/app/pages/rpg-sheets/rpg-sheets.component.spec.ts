import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgSheetsComponent } from './rpg-sheets.component';

describe('RpgSheetsComponent', () => {
  let component: RpgSheetsComponent;
  let fixture: ComponentFixture<RpgSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
