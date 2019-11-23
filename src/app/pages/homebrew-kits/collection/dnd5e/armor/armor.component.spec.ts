import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionDnd5eArmorComponent } from './armor.component';

describe('HomebrewKitCollectionDnd5eArmorComponent', () => {
  let component: HomebrewKitCollectionDnd5eArmorComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionDnd5eArmorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionDnd5eArmorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionDnd5eArmorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
