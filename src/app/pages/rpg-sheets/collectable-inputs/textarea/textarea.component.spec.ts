import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgCollectableInputTextareaComponent } from './textarea.component';

describe('RpgCollectableInputTextareaComponent', () => {
  let component: RpgCollectableInputTextareaComponent;
  let fixture: ComponentFixture<RpgCollectableInputTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgCollectableInputTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgCollectableInputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
