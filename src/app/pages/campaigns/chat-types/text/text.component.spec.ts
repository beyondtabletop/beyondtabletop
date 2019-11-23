import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignChatTypeTextComponent } from './text.component';

describe('CampaignChatTypeTextComponent', () => {
  let component: CampaignChatTypeTextComponent;
  let fixture: ComponentFixture<CampaignChatTypeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignChatTypeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignChatTypeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
