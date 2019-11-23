import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgCollectableInputBooleanComponent } from './boolean.component';

describe('RpgCollectableInputBooleanComponent', () => {
  let component: RpgCollectableInputBooleanComponent;
  let fixture: ComponentFixture<RpgCollectableInputBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgCollectableInputBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgCollectableInputBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
