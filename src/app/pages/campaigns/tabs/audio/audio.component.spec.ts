import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabAudioComponent } from './audio.component';

describe('CampaignTabAudioComponent', () => {
  let component: CampaignTabAudioComponent;
  let fixture: ComponentFixture<CampaignTabAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
