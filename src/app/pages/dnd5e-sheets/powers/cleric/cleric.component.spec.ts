import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerClericComponent } from './cleric.component';

describe('Dnd5ePowerClericComponent', () => {
  let component: Dnd5ePowerClericComponent;
  let fixture: ComponentFixture<Dnd5ePowerClericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerClericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerClericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
