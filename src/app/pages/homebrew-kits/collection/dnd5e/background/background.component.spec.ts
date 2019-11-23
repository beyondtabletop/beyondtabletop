import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionDnd5eBackgroundComponent } from './background.component';

describe('HomebrewKitCollectionDnd5eBackgroundComponent', () => {
  let component: HomebrewKitCollectionDnd5eBackgroundComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionDnd5eBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionDnd5eBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionDnd5eBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
