import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabMonstersComponent } from './monsters.component';

describe('CampaignTabMonstersComponent', () => {
  let component: CampaignTabMonstersComponent;
  let fixture: ComponentFixture<CampaignTabMonstersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabMonstersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
