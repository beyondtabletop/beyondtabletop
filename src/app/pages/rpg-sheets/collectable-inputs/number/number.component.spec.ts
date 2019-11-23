import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgCollectableInputNumberComponent } from './number.component';

describe('RpgCollectableInputNumberComponent', () => {
  let component: RpgCollectableInputNumberComponent;
  let fixture: ComponentFixture<RpgCollectableInputNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgCollectableInputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgCollectableInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
