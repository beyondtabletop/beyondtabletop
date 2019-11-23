import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderAbilitiesComponent } from './abilities.component';

describe('Dnd5eBuilderAbilitiesComponent', () => {
  let component: Dnd5eBuilderAbilitiesComponent;
  let fixture: ComponentFixture<Dnd5eBuilderAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
