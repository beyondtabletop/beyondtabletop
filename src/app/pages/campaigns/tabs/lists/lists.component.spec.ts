import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabListsComponent } from './lists.component';

describe('CampaignTabListsComponent', () => {
  let component: CampaignTabListsComponent;
  let fixture: ComponentFixture<CampaignTabListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
