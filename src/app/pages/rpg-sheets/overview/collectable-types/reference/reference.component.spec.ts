import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewCollectableTypeReferenceComponent } from './reference.component';

describe('RpgOverviewCollectableTypeReferenceComponent', () => {
  let component: RpgOverviewCollectableTypeReferenceComponent;
  let fixture: ComponentFixture<RpgOverviewCollectableTypeReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewCollectableTypeReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewCollectableTypeReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
