import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAudioTypeMp3Component } from './mp3.component';

describe('CampaignAudioTypeMp3Component', () => {
  let component: CampaignAudioTypeMp3Component;
  let fixture: ComponentFixture<CampaignAudioTypeMp3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAudioTypeMp3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAudioTypeMp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
