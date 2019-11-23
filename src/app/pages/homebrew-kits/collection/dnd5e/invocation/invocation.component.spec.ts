import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitCollectionDnd5eInvocationComponent } from './invocation.component';

describe('HomebrewKitCollectionDnd5eInvocationComponent', () => {
  let component: HomebrewKitCollectionDnd5eInvocationComponent;
  let fixture: ComponentFixture<HomebrewKitCollectionDnd5eInvocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitCollectionDnd5eInvocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitCollectionDnd5eInvocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
