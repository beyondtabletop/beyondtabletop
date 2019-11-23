import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerDruidComponent } from './druid.component';

describe('Dnd5eBuilderPowerDruidComponent', () => {
  let component: Dnd5eBuilderPowerDruidComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerDruidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerDruidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerDruidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
