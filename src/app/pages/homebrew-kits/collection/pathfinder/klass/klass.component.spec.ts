import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionPathfinderKlassComponent } from './klass.component';

describe('HomebrewKitCollectionPathfinderKlassComponent', () => {
  let component: HomebrewKitCollectionPathfinderKlassComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionPathfinderKlassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionPathfinderKlassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionPathfinderKlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
