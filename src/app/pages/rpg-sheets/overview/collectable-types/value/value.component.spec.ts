import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewCollectableTypeValueComponent } from './value.component';

describe('RpgOverviewCollectableTypeValueComponent', () => {
  let component: RpgOverviewCollectableTypeValueComponent;
  let fixture: ComponentFixture<RpgOverviewCollectableTypeValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewCollectableTypeValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewCollectableTypeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
