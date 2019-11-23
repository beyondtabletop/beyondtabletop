import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignChatTypeDicerollComponent } from './diceroll.component';

describe('CampaignChatTypeDicerollComponent', () => {
  let component: CampaignChatTypeDicerollComponent;
  let fixture: ComponentFixture<CampaignChatTypeDicerollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignChatTypeDicerollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignChatTypeDicerollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
