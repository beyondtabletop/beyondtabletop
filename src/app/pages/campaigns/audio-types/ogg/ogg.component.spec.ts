import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAudioTypeOggComponent } from './ogg.component';

describe('CampaignAudioTypeOggComponent', () => {
  let component: CampaignAudioTypeOggComponent;
  let fixture: ComponentFixture<CampaignAudioTypeOggComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAudioTypeOggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAudioTypeOggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
