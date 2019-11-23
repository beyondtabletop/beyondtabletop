import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerSorcererComponent } from './sorcerer.component';

describe('Dnd5ePowerSorcererComponent', () => {
  let component: Dnd5ePowerSorcererComponent;
  let fixture: ComponentFixture<Dnd5ePowerSorcererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerSorcererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerSorcererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
