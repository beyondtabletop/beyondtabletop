import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionPathfinderFeatComponent } from './feat.component';

describe('HomebrewKitCollectionPathfinderFeatComponent', () => {
  let component: HomebrewKitCollectionPathfinderFeatComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionPathfinderFeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionPathfinderFeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionPathfinderFeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
