import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabItemsComponent } from './items.component';

describe('Dnd5eTabItemsComponent', () => {
  let component: Dnd5eTabItemsComponent;
  let fixture: ComponentFixture<Dnd5eTabItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
