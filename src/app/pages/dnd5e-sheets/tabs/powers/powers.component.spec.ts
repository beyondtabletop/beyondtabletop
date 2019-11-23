import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabPowersComponent } from './powers.component';

describe('Dnd5eTabPowersComponent', () => {
  let component: Dnd5eTabPowersComponent;
  let fixture: ComponentFixture<Dnd5eTabPowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabPowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
