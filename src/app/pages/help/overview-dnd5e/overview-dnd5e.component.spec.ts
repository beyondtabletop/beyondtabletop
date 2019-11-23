import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpOverviewDnd5eComponent } from './overview-dnd5e.component';

describe('HelpOverviewDnd5eComponent', () => {
  let component: HelpOverviewDnd5eComponent;
  let fixture: ComponentFixture<HelpOverviewDnd5eComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpOverviewDnd5eComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpOverviewDnd5eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
