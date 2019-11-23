import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignChatTypeHtmlComponent } from './html.component';

describe('CampaignChatTypeHtmlComponent', () => {
  let component: CampaignChatTypeHtmlComponent;
  let fixture: ComponentFixture<CampaignChatTypeHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignChatTypeHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignChatTypeHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
