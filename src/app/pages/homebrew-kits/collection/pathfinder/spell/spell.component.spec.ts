import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionPathfinderSpellComponent } from './spell.component';

describe('HomebrewKitCollectionPathfinderSpellComponent', () => {
  let component: HomebrewKitCollectionPathfinderSpellComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionPathfinderSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionPathfinderSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionPathfinderSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
