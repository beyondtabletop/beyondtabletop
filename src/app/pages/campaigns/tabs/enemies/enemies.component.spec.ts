import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTabEnemiesComponent } from './enemies.component';

describe('CampaignTabEnemiesComponent', () => {
  let component: CampaignTabEnemiesComponent;
  let fixture: ComponentFixture<CampaignTabEnemiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTabEnemiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTabEnemiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
