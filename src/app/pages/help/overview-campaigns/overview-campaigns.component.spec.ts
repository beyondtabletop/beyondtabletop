import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpOverviewCampaignsComponent } from './overview-campaigns.component';

describe('HelpOverviewCampaignsComponent', () => {
  let component: HelpOverviewCampaignsComponent;
  let fixture: ComponentFixture<HelpOverviewCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpOverviewCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpOverviewCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
