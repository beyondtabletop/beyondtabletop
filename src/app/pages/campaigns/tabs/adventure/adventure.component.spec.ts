import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabAdventureComponent } from './adventure.component';

describe('CampaignTabAdventureComponent', () => {
  let component: CampaignTabAdventureComponent;
  let fixture: ComponentFixture<CampaignTabAdventureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabAdventureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabAdventureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
