import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldDeleteComponent } from './hold-delete.component';

describe('HoldDeleteComponent', () => {
  let component: HoldDeleteComponent;
  let fixture: ComponentFixture<HoldDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
