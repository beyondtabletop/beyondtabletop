import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabSettingsComponent } from './settings.component';

describe('Dnd5eTabSettingsComponent', () => {
  let component: Dnd5eTabSettingsComponent;
  let fixture: ComponentFixture<Dnd5eTabSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
