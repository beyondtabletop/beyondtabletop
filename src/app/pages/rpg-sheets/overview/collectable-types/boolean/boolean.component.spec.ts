import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewCollectableTypeBooleanComponent } from './boolean.component';

describe('RpgOverviewCollectableTypeBooleanComponent', () => {
  let component: RpgOverviewCollectableTypeBooleanComponent;
  let fixture: ComponentFixture<RpgOverviewCollectableTypeBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewCollectableTypeBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewCollectableTypeBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
