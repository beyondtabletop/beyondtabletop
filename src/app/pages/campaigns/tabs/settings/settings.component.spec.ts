import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabSettingsComponent } from './settings.component';

describe('CampaignTabSettingsComponent', () => {
  let component: CampaignTabSettingsComponent;
  let fixture: ComponentFixture<CampaignTabSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
