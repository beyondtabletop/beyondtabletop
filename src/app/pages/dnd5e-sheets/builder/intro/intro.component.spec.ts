import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderIntroComponent } from './intro.component';

describe('Dnd5eBuilderIntroComponent', () => {
  let component: Dnd5eBuilderIntroComponent;
  let fixture: ComponentFixture<Dnd5eBuilderIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
