import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAudioTypeYoutubeComponent } from './youtube.component';

describe('CampaignAudioTypeYoutubeComponent', () => {
  let component: CampaignAudioTypeYoutubeComponent;
  let fixture: ComponentFixture<CampaignAudioTypeYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAudioTypeYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAudioTypeYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
