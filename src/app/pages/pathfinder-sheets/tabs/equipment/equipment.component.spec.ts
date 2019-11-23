import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderTabEquipmentComponent } from './equipment.component';

describe('PathfinderTabEquipmentComponent', () => {
  let component: PathfinderTabEquipmentComponent;
  let fixture: ComponentFixture<PathfinderTabEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderTabEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderTabEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
