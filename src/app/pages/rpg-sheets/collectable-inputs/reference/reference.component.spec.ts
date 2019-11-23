import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgCollectableInputReferenceComponent } from './reference.component';

describe('RpgCollectableInputReferenceComponent', () => {
  let component: RpgCollectableInputReferenceComponent;
  let fixture: ComponentFixture<RpgCollectableInputReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgCollectableInputReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgCollectableInputReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
