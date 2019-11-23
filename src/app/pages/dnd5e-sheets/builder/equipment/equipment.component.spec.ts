import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dnd5eBuilderEquipmentComponent } from './equipment.component';

describe('Dnd5eBuilderEquipmentComponent', () => {
  let component: Dnd5eBuilderEquipmentComponent;
  let fixture: ComponentFixture<Dnd5eBuilderEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dnd5eBuilderEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dnd5eBuilderEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
