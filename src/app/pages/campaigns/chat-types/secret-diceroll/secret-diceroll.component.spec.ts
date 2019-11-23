import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignChatTypeSecretDicerollComponent } from './secret-diceroll.component';

describe('CampaignChatTypeSecretDicerollComponent', () => {
  let component: CampaignChatTypeSecretDicerollComponent;
  let fixture: ComponentFixture<CampaignChatTypeSecretDicerollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignChatTypeSecretDicerollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignChatTypeSecretDicerollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
