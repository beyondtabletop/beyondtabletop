import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerWarlockComponent } from './warlock.component';

describe('Dnd5ePowerWarlockComponent', () => {
  let component: Dnd5ePowerWarlockComponent;
  let fixture: ComponentFixture<Dnd5ePowerWarlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerWarlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerWarlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
