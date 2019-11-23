import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eTabEquipmentComponent } from './equipment.component';

describe('Dnd5eTabEquipmentComponent', () => {
  let component: Dnd5eTabEquipmentComponent;
  let fixture: ComponentFixture<Dnd5eTabEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eTabEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eTabEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
