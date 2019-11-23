import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionDnd5eSpellComponent } from './spell.component';

describe('HomebrewKitCollectionDnd5eSpellComponent', () => {
  let component: HomebrewKitCollectionDnd5eSpellComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionDnd5eSpellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionDnd5eSpellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionDnd5eSpellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
