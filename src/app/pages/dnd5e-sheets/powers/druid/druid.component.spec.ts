import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5ePowerDruidComponent } from './druid.component';

describe('Dnd5ePowerDruidComponent', () => {
  let component: Dnd5ePowerDruidComponent;
  let fixture: ComponentFixture<Dnd5ePowerDruidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5ePowerDruidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5ePowerDruidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
