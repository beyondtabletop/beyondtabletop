import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabSummaryComponent } from './summary.component';

describe('CampaignTabSummaryComponent', () => {
  let component: CampaignTabSummaryComponent;
  let fixture: ComponentFixture<CampaignTabSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
