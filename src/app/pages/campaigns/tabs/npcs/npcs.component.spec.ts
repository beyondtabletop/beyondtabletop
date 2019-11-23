import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabNpcsComponent } from './npcs.component';

describe('CampaignTabNpcsComponent', () => {
  let component: CampaignTabNpcsComponent;
  let fixture: ComponentFixture<CampaignTabNpcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabNpcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabNpcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
