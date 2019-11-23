import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitTypeOtherComponent } from './other.component';

describe('HomebrewKitTypeOtherComponent', () => {
  let component: HomebrewKitTypeOtherComponent;
  let fixture: ComponentFixture<HomebrewKitTypeOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitTypeOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitTypeOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
