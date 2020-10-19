import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgOverviewTabComponent } from './tab.component'

describe('RpgOverviewTabComponent', () => {
  let component: RpgOverviewTabComponent;
  let fixture: ComponentFixture<RpgOverviewTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpgOverviewTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpgOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
