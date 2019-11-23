import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionDnd5eKlassComponent } from './klass.component';

describe('HomebrewKitCollectionDnd5eKlassComponent', () => {
  let component: HomebrewKitCollectionDnd5eKlassComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionDnd5eKlassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionDnd5eKlassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionDnd5eKlassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
