import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionPathfinderWeaponComponent } from './weapon.component';

describe('HomebrewKitCollectionPathfinderWeaponComponent', () => {
  let component: HomebrewKitCollectionPathfinderWeaponComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionPathfinderWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionPathfinderWeaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionPathfinderWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
