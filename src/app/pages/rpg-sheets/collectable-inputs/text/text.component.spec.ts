import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgCollectableInputTextComponent } from './text.component';

describe('RpgCollectableInputTextComponent', () => {
  let component: RpgCollectableInputTextComponent;
  let fixture: ComponentFixture<RpgCollectableInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgCollectableInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgCollectableInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
