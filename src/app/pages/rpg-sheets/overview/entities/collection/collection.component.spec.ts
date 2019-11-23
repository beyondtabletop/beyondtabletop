import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewEntityCollectionComponent } from './collection.component';

describe('RpgOverviewEntityCollectionComponent', () => {
  let component: RpgOverviewEntityCollectionComponent;
  let fixture: ComponentFixture<RpgOverviewEntityCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewEntityCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewEntityCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
