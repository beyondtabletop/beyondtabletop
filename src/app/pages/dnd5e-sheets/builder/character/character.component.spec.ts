import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderCharacterComponent } from './character.component';

describe('Dnd5eBuilderCharacterComponent', () => {
  let component: Dnd5eBuilderCharacterComponent;
  let fixture: ComponentFixture<Dnd5eBuilderCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
