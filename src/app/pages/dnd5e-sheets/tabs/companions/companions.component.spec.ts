import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabCompanionsComponent } from './companions.component';

describe('Dnd5eTabCompanionsComponent', () => {
  let component: Dnd5eTabCompanionsComponent;
  let fixture: ComponentFixture<Dnd5eTabCompanionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabCompanionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabCompanionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
