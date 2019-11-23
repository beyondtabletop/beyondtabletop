import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerWarlockComponent } from './warlock.component';

describe('Dnd5eBuilderPowerWarlockComponent', () => {
  let component: Dnd5eBuilderPowerWarlockComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerWarlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerWarlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerWarlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
