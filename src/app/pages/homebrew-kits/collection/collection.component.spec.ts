import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionComponent } from './collection.component';

describe('HomebrewKitCollectionComponent', () => {
  let component: HomebrewKitCollectionComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
