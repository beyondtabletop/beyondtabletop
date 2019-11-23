import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderFinishedComponent } from './finished.component';

describe('Dnd5eBuilderFinishedComponent', () => {
  let component: Dnd5eBuilderFinishedComponent;
  let fixture: ComponentFixture<Dnd5eBuilderFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
