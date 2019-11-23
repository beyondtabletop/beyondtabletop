import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderListsComponent } from './lists.component';

describe('Dnd5eBuilderListsComponent', () => {
  let component: Dnd5eBuilderListsComponent;
  let fixture: ComponentFixture<Dnd5eBuilderListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
