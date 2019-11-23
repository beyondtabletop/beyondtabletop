import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpOverviewRpgComponent } from './overview-rpg.component';

describe('HelpOverviewRpgComponent', () => {
  let component: HelpOverviewRpgComponent;
  let fixture: ComponentFixture<HelpOverviewRpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpOverviewRpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpOverviewRpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
