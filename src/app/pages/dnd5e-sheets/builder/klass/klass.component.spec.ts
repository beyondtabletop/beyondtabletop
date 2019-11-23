import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderKlassComponent } from './klass.component';

describe('Dnd5eBuilderKlassComponent', () => {
  let component: Dnd5eBuilderKlassComponent;
  let fixture: ComponentFixture<Dnd5eBuilderKlassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderKlassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderKlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
