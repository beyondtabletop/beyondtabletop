import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionDnd5eWeaponComponent } from './weapon.component';

describe('HomebrewKitCollectionDnd5eWeaponComponent', () => {
  let component: HomebrewKitCollectionDnd5eWeaponComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionDnd5eWeaponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionDnd5eWeaponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionDnd5eWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
