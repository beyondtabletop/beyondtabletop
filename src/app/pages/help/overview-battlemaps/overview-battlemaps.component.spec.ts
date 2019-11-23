import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpOverviewBattlemapsComponent } from './overview-battlemaps.component';

describe('HelpOverviewBattlemapsComponent', () => {
  let component: HelpOverviewBattlemapsComponent;
  let fixture: ComponentFixture<HelpOverviewBattlemapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpOverviewBattlemapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpOverviewBattlemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
