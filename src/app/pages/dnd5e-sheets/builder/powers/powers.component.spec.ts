import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowersComponent } from './powers.component';

describe('Dnd5eBuilderPowersComponent', () => {
  let component: Dnd5eBuilderPowersComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
