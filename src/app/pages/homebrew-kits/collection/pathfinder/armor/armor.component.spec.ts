import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionPathfinderArmorComponent } from './armor.component';

describe('HomebrewKitCollectionPathfinderArmorComponent', () => {
  let component: HomebrewKitCollectionPathfinderArmorComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionPathfinderArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionPathfinderArmorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionPathfinderArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
