import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderPowerSorcererComponent } from './sorcerer.component';

describe('Dnd5eBuilderPowerSorcererComponent', () => {
  let component: Dnd5eBuilderPowerSorcererComponent;
  let fixture: ComponentFixture<Dnd5eBuilderPowerSorcererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderPowerSorcererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderPowerSorcererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
