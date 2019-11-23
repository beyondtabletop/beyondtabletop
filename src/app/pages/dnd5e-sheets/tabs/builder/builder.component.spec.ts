import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabBuilderComponent } from './builder.component';

describe('Dnd5eTabBuilderComponent', () => {
  let component: Dnd5eTabBuilderComponent;
  let fixture: ComponentFixture<Dnd5eTabBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
