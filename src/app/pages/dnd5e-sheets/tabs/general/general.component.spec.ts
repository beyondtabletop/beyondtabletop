import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabGeneralComponent } from './general.component';

describe('Dnd5eTabGeneralComponent', () => {
  let component: Dnd5eTabGeneralComponent;
  let fixture: ComponentFixture<Dnd5eTabGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
