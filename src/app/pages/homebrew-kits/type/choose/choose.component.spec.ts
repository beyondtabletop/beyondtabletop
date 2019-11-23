import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitTypeChooseComponent } from './choose.component';

describe('HomebrewKitTypeChooseComponent', () => {
  let component: HomebrewKitTypeChooseComponent;
  let fixture: ComponentFixture<HomebrewKitTypeChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitTypeChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitTypeChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
