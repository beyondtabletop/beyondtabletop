import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabListsComponent } from './lists.component';

describe('Dnd5eTabListsComponent', () => {
  let component: Dnd5eTabListsComponent;
  let fixture: ComponentFixture<Dnd5eTabListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
