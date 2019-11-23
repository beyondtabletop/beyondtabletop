import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerBardComponent } from './bard.component';

describe('Dnd5eBuilderPowerBardComponent', () => {
  let component: Dnd5eBuilderPowerBardComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerBardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerBardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerBardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
