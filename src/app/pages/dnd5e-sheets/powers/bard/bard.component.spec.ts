import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerBardComponent } from './bard.component';

describe('Dnd5ePowerBardComponent', () => {
  let component: Dnd5ePowerBardComponent;
  let fixture: ComponentFixture<Dnd5ePowerBardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerBardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerBardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
