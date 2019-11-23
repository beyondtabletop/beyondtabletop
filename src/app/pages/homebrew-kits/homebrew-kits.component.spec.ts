import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebrewKitsComponent } from './homebrew-kits.component';

describe('HomebrewKitsComponent', () => {
  let component: HomebrewKitsComponent;
  let fixture: ComponentFixture<HomebrewKitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebrewKitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebrewKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
